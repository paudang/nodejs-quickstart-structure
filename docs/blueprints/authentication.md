# Authentication & JWT Blueprint

This blueprint provides a detailed guide on how the pluggable JWT authentication system works and how to set it up in your generated microservice.

## 🔐 Overview

When you choose **JWT** as your authentication provider, the generator scaffolds a robust, production-ready authentication flow. This includes user registration, secure login with bcrypt password hashing, and token-based authorization using JSON Web Tokens (JWT).

---

## ⚙️ Configuration

Authentication behavior is controlled via environment variables. Ensure these are set in your `.env` file:

```bash
# JWT Secret key for signing tokens (Keep this private!)
JWT_SECRET=your_super_secret_key_here

# Token expiration time (e.g., 1h, 1d, 7d)
JWT_EXPIRES_IN=1d
```

---

## 🚀 Authentication Flow

### 1. User Registration (Sign Up)
To create a new account, use the user creation endpoint. This is handled by the `UserController`. The system automatically hashes the password using `bcrypt` before saving it to the database.

::: code-group
```bash [REST API]
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

```graphql [GraphQL]
mutation CreateUser {
  createUser(
    name: "John Doe", 
    email: "john@example.com", 
    password: "securepassword123"
  ) {
    id
    email
  }
}
```
:::

### 2. User Login
Authenticate with your credentials to receive a JWT.

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🛡️ Protecting Routes

To restrict access to specific routes, use the provided `authMiddleware`.

### MVC (Express)
In your route files (e.g., `src/routes/userRoutes.ts`), apply the middleware to the routes you want to protect:

```typescript
import { Router } from 'express';
import { authMiddleware } from '@/middleware/authMiddleware';
import { UserController } from '@/controllers/userController';

const router = Router();
const userController = new UserController();

// Public route
router.get('/', userController.getUsers);

// Protected routes
router.get('/:id', authMiddleware, userController.getUserById);
router.patch('/:id', authMiddleware, userController.updateUser);
```

### Clean Architecture
In Clean Architecture, the middleware is typically applied in the `infrastructure/webserver` layer or directly in the route definitions:

```typescript
// src/interfaces/routes/userRoutes.ts
router.get('/:id', authMiddleware, (req, res) => userController.getUserById(req, res));
```

---

## 🔑 Accessing User Information

Once a request passes through the `authMiddleware`, the decoded user payload is attached to the request object as `req.user`.

```typescript
// Inside a controller (e.g., UserController)
async getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const currentUser = (req as any).user;
    
    logger.info(`User ${currentUser.email} is accessing profile: ${id}`);
    
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json(user);
  } catch (error) {
    next(error);
  }
}
```

---

## 🧪 Testing with JWT

When making requests to protected endpoints, include the token in the `Authorization` header:

```bash
Authorization: Bearer <your_jwt_token_here>
```

### Postman / Insomnia
1. Select the **Auth** tab.
2. Choose **Bearer Token**.
3. Paste the token received from the `/api/auth/login` endpoint.

---

## 🏗️ Integrated Flow: JWT + Kafka

When both **JWT Authentication** and **Kafka Communication** are enabled, the registration process follows a powerful integrated pattern:

1.  **Request**: Client sends registration data (name, email, password) to `POST /api/users`.
2.  **Security**: `UserController` hashes the password using `bcryptjs`.
3.  **Persistence**: The user is saved to the chosen database (MySQL/PostgreSQL/MongoDB).
4.  **Event Production**: Immediately after successful save, the `UserController` produces a `USER_CREATED` event to Kafka via `kafkaService.sendMessage`.
5.  **Response**: The client receives the created user object (with the password safely omitted).
6.  **Background Processing**: Any running Kafka consumers (like a welcome email worker) pick up the `USER_CREATED` event and process it asynchronously.

This ensures your authentication flow is both secure and event-driven out of the box.

---

## 📂 Architecture & File Locations

| File | MVC Location | Clean Architecture Location |
| :--- | :--- | :--- |
| **JWT Service** | `src/services/jwtService.ts` | `src/infrastructure/auth/jwtService.ts` |
| **Auth Middleware** | `src/middleware/authMiddleware.ts` | `src/infrastructure/middleware/authMiddleware.ts` |
| **Auth Controller** | `src/controllers/authController.ts` | `src/interfaces/controllers/authController.ts` |
| **Auth Routes** | `src/routes/authRoutes.ts` | `src/interfaces/routes/authRoutes.ts` |

---

## 🔒 Advanced Security

Our JWT implementation goes beyond basic tokens by providing **Refresh Token Rotation** and **Redis-based Token Revocation (Blacklisting)** for enterprise-grade security.

### 1. Refresh Token Rotation
When a user logs in, they receive two tokens:
- **`accessToken`**: Short-lived (e.g., 15 minutes). Used to access protected routes.
- **`refreshToken`**: Long-lived (e.g., 7 days). Used to silently obtain a new `accessToken` when it expires.

To rotate your tokens, submit the active refresh token:

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUz...long_token..."
}
```

**Theft Detection**: Every `refreshToken` has a unique ID (`jti`). If an attacker steals a `refreshToken` and attempts to use it *after* it has already been used by the legitimate user, the server detects this reuse (theft) and **immediately revokes all active sessions** for that user, requiring them to log in again.

### 2. Token Revocation (Blacklisting) & Logout
Logging out on purely stateless JWT architectures is notoriously difficult. We solve this by implementing a highly performant **Token Blacklist**.

When a user logs out:
```bash
POST /api/auth/logout
Authorization: Bearer <active_accessToken>
Content-Type: application/json

{
  "refreshToken": "<active_refreshToken>"
}
```

1. The server reads the remaining time-to-live (TTL) on the `accessToken`.
2. It stores the token's `jti` in **Redis** (or Memory Cache) with an exact expiration matching the TTL.
3. It deletes the active `refreshToken` from the server's tracking lists.

Every time a protected route is requested, the `authMiddleware` performs an ultra-fast check against Redis to ensure the provided `accessToken` isn't blacklisted.

*(Note: If you disabled caching by selecting "None" during generation, this feature gracefully falls back to an in-memory Map, though state is lost upon server restarts).*

---

> [!TIP]
> **Security Best Practice**: Never commit your `JWT_SECRET` or `JWT_REFRESH_SECRET` to version control. Always use environment variables and ensure your `.env` file is listed in `.gitignore`.
