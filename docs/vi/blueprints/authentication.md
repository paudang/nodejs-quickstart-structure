# Xác thực

Kế hoạch chi tiết này cung cấp hướng dẫn toàn diện về cách thiết lập và tìm hiểu **hệ thống xác thực cấp doanh nghiệp** được tạo bởi trình tạo của chúng tôi.

Cho dù bạn đang sử dụng email/mật khẩu tiêu chuẩn hay Đăng nhập mạng xã hội (Google/GitHub), hướng dẫn này bao gồm mọi thứ từ cấu hình môi trường đến các tính năng bảo mật nâng cao như xoay vòng mã thông báo (token rotation) và phát hiện hành vi trộm cắp mã thông báo.

---

## Cấu hình

Xác thực được điều khiển bởi các biến môi trường trong tệp `.env` của bạn.

```bash
# Core JWT Config
JWT_SECRET=your_super_secret_key          # Dùng để ký Access Tokens
JWT_REFRESH_SECRET=your_refresh_secret    # Dùng để ký Refresh Tokens
JWT_EXPIRES_IN=15m                        # TTL của Access token (ngắn hạn)
JWT_REFRESH_EXPIRES_IN=7d                 # TTL của Refresh token (dài hạn)

# Social Login (Tùy chọn)
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
# Dùng /auth cho dự án MVC, /api/auth cho các dự án khác
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback 

GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

---

## Luồng xác thực tiêu chuẩn (Email/Mật khẩu)

Luồng tiêu chuẩn của chúng tôi tuân theo các phương pháp hay nhất trong ngành: **Access Tokens không trạng thái (Stateless)** kết hợp với **Refresh Tokens bền vững (Persistent)**.

### 1. Đăng ký người dùng (Signup)
Người dùng có thể đăng ký bằng cách gửi tên, email và mật khẩu của họ. Hệ thống tự động băm mật khẩu bằng `bcryptjs` trước khi lưu trữ.

::: code-group
```bash [REST API]
POST /api/users
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

```graphql [GraphQL]
mutation {
  createUser(name: "Jane Doe", email: "jane@example.com", password: "securepassword123") {
    id
    email
  }
}
```
:::

### 2. Đăng nhập người dùng (Login)
Sau khi đăng nhập thành công, máy chủ sẽ trả về một `accessToken` và một `refreshToken`.

```bash
POST /api/auth/login
{
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

**Điều gì xảy ra tiếp theo?**
- **Phía Client**: Lưu trữ `accessToken` trong bộ nhớ ứng dụng (hoặc state an toàn) và `refreshToken` trong một cookie bảo mật HttpOnly (mặc định đối với MVC) hoặc bộ lưu trữ an toàn (đối với API).
- **Ủy quyền (Authorization)**: Đính kèm mã thông báo trong các yêu cầu tiếp theo: `Authorization: Bearer <accessToken>`.

---

## Tích hợp Đăng nhập Mạng xã hội (Social Login)

Trình tạo hỗ trợ hệ thống "Xác thực mạng xã hội dạng cắm" thích ứng với kiến trúc của bạn (MVC, SPA hoặc Mobile).

### Cách hoạt động

Trình tạo xử lý sự phức tạp của OAuth2 bằng cách cung cấp một luồng xác thực tích hợp, liền mạch.

![Sơ đồ luồng xác thực](/auth-flow-diagram.png)

<details>
<summary>Xem sơ đồ tuần tự kỹ thuật (Nâng cao)</summary>

![Sơ đồ luồng xác thực tuần tự](/auth-flow-diagram-sequence.png)

</details>

### Hướng dẫn thiết lập nhà cung cấp

| Nhà cung cấp | Nơi thiết lập | URL chuyển hướng yêu cầu |
| :--- | :--- | :--- |
| **Google** | [Google Cloud Console](https://console.cloud.google.com/) | `http://localhost:3000/[auth\|api/auth]/google/callback` |
| **GitHub** | [GitHub Developer Settings](https://github.com/settings/developers) | `http://localhost:3000/[auth\|api/auth]/github/callback` |

> [!TIP] MẸO
> **Kiểm thử trên Swagger**: Nút "Execute" trong giao diện Swagger UI sẽ trả về lỗi "Failed to fetch" đối với các route thực hiện `res.redirect()` sang Google/GitHub. Đây là hành vi mặc định của trình duyệt. Để kiểm thử các route này, hãy dán trực tiếp đường dẫn `http://localhost:3000/[auth|api/auth]/google` vào thanh địa chỉ của trình duyệt.

### Cách kiểm thử luồng trao đổi mã thông báo thủ công

Việc kiểm thử điểm cuối `POST /auth/social/exchange` (dành cho Mobile/SPAs) yêu cầu một mã ủy quyền (authorization code) thực tế có hiệu lực một lần.

1.  **Xây dựng URL xác thực**:
    - **Google**: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=YOUR_CLIENT_ID&scope=email%20profile&redirect_uri=http://localhost:3000/[auth|api/auth]/google/callback`
    - **GitHub**: `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&scope=user:email&redirect_uri=http://localhost:3000/[auth|api/auth]/github/callback`
2.  **Lấy mã code (Mẹo tắt máy chủ)**:
    > [!IMPORTANT] QUAN TRỌNG
    > Mã ủy quyền chỉ có hiệu lực **sử dụng một lần**. Nếu máy chủ của bạn đang chạy, nó sẽ tự động bắt hướng chuyển hướng và "tiêu thụ" mã code này ngay lập tức, khiến mã code không còn hiệu lực cho việc kiểm thử trên Swagger.
    >
    > **Để lấy mã code thủ công**:
    > 1. **Dừng máy chủ của bạn** (Ctrl+C).
    > 2. Nhấp vào URL xác thực trong trình duyệt và đăng nhập.
    > 3. Trình duyệt của bạn sẽ hiển thị "Site can't be reached" (đây là điều bình thường!).
    > 4. Sao chép mã code từ thanh địa chỉ (ví dụ: `code=4/0Af...`).
    > 5. **Khởi động lại máy chủ** (`npm run dev`) và tiếp tục Bước 3.

3.  **Trao đổi mã code trong Swagger**:
    - **Giải mã URL (URL Decoding)**: Nếu mã code của bạn chứa `%2F`, hãy thay thế nó bằng ký tự `/`.
    - **JSON Body**: Dán mã code vào request body của `POST /auth/social/exchange`.
    - **Redirect URI**: Đảm bảo `redirectUri` khớp hoàn toàn với URI được sử dụng ở Bước 1.
    ```json
    {
      "code": "YOUR_COPIED_CODE",
      "provider": "Google",
      "redirectUri": "http://localhost:3000/[auth|api/auth]/google/callback"
    }
    ```
    - **Execute**: Bạn sẽ nhận được các mã thông báo JWT trong phản hồi body trả về.

> [!CAUTION] CẨN TRỌNG
> **Sử dụng một lần**: Mã ủy quyền chỉ sử dụng được một lần duy nhất. Nếu bạn đã sử dụng nó một lần trong Swagger (hoặc nếu trình duyệt của bạn đã gọi callback route trước), mã code đó sẽ mất hiệu lực. Bạn phải tạo một mã code mới cho mỗi lần kiểm thử.

> [!TIP] Tìm hiểu sâu về bảo mật đăng nhập mạng xã hội
> Bạn muốn hiểu rõ kiến trúc đằng sau cách triển khai này? Chúng tôi đã xuất bản hai bài viết bảo mật toàn diện trên **System Weakness (Medium)** về chính các mẫu thiết kế này:
> - [The OAuth Integration Debt: Why Your Social Login is a CSRF Risk](https://systemweakness.com/the-oauth-integration-debt-why-your-social-login-is-a-csrf-risk-c2008099c05e)
> - [The Social Login Trap: Architecting Defenses Against Account Takeovers](https://systemweakness.com/the-social-login-trap-architecting-defenses-against-account-takeovers-3f34948169c4)

---

## Các tính năng bảo mật nâng cao

Hệ thống của chúng tôi đi kèm với các tính năng bảo mật chuẩn "Big Tech" được cấu hình sẵn.

### 1. Xoay vòng Refresh Token (Refresh Token Rotation)
Mỗi lần một `refreshToken` được sử dụng để lấy một `accessToken` mới, `refreshToken` cũ sẽ bị vô hiệu hóa và một **mã thông báo mới hoàn toàn** sẽ được cấp phát. Điều này giảm thiểu tối đa cơ hội tấn công của kẻ gian.

### 2. Phát hiện hành vi trộm cắp mã thông báo
Nếu một `refreshToken` bị rò rỉ và bị kẻ tấn công sử dụng lại:
1. Máy chủ phát hiện việc tái sử dụng `jti` (JWT ID) cũ.
2. Hệ thống ngay lập tức **thu hồi tất cả các phiên hoạt động** (sessions) của người dùng đó.
3. Người dùng bắt buộc phải đăng nhập lại, giúp ngăn chặn kẻ tấn công truy cập trái phép.

### 3. Danh sách đen mã thông báo (Đăng xuất)
Vì mã thông báo JWT không lưu trạng thái (stateless), chúng không thể bị "xóa" từ phía client. Chúng tôi giải quyết vấn đề này bằng cách lưu trữ các `jti` của các mã thông báo đã đăng xuất vào **Redis** với thời gian tồn tại (TTL) khớp với thời gian hết hạn của mã thông báo đó.

```bash
POST /api/auth/logout
Authorization: Bearer <accessToken>
{
  "refreshToken": "<refreshToken>"
}
```

> [!TIP] Tìm hiểu sâu về bảo mật <VocabLink category="auth-security" term="authentication" text="JWT" />
> Chúng tôi đã thảo luận chi tiết về các thách thức phức tạp khi mở rộng hệ thống bảo mật không trạng thái của JWT và cách tiếp cận danh sách đen bằng Redis giải quyết chúng. Hãy đọc bài viết tiêu biểu của chúng tôi trên **System Weakness**:
> - 📖 [The Illusion of Stateless Security: Rethinking JWT Revocation at Scale](https://systemweakness.com/the-illusion-of-stateless-security-rethinking-jwt-revocation-at-scale-8426472c5022)

---

## Bản đồ tệp & Kiến trúc

| Thành phần | Trách nhiệm | Vị trí trong MVC | Vị trí trong Clean Architecture |
| :--- | :--- | :--- | :--- |
| **JwtService** | Xử lý logic token & kiểm tra Blacklist. | `src/services/jwtService.ts` | `src/infrastructure/auth/jwtService.ts` |
| **SocialAuthService** | Nhà cung cấp trao đổi hồ sơ OAuth2. | `src/services/socialAuthService.ts` | `src/infrastructure/auth/socialAuthService.ts` |
| **SocialLoginUseCase** | Logic nghiệp vụ xác thực MXH. | N/A (ở Controller) | `src/usecases/auth/socialLoginUseCase.ts` |
| **AuthMiddleware** | Đánh chặn JWT & kiểm tra danh sách đen. | `src/middleware/authMiddleware.ts` | `src/infrastructure/webserver/middleware/authMiddleware.ts` |
| **AuthController** | Điều phối yêu cầu. | `src/controllers/authController.ts` | `src/interfaces/controllers/auth/authController.ts` |

### Hỗ trợ kiến trúc sạch (Clean Architecture)

Đối với các ứng dụng cấp doanh nghiệp, trình tạo thiết lập mô-đun Auth bằng cách tuân thủ nghiêm ngặt các ranh giới kiến trúc:
- **Tầng cơ sở hạ tầng (Infrastructure Layer)**: Triển khai giao diện `ISocialProvider` cho Google và GitHub. Điều này tuân theo **Nguyên tắc Đóng/Mở (Open/Closed Principle)**, giúp dễ dàng thêm các nhà cung cấp mới (Facebook, Apple) mà không cần sửa đổi logic hiện có.
- **Tầng ứng dụng (Application Layer)**: Lớp `socialLoginUseCase` đóng gói logic nghiệp vụ cốt lõi, đảm bảo luồng xác thực độc lập hoàn toàn với framework web hoặc các API bên ngoài.
- **Bảo mật trạng thái**: Ngay cả đối với người dùng đăng nhập bằng mạng xã hội, hệ thống vẫn tạo ra các `jti` độc nhất và theo dõi phiên trong Redis, đảm bảo tính năng "Thu hồi hàng loạt" hoạt động trên mọi phương thức xác thực.

---

> [!TIP] MẸO
> **Mẹo nhỏ**: Sử dụng bộ **Postman Collection** trong thư mục `docs/postman` (nếu được tạo) để kiểm thử các luồng này một cách dễ dàng. Hãy nhớ thiết lập các biến môi trường trước!
