# Optional API Gateway Integration

The **Node.js Quickstart Generator** supports seamlessly injecting a hardened **API Gateway** in front of your Node.js application to handle ingress traffic, rate limiting, and security rules.

## Overview
When you enable **Advanced Options** and your API type is REST or GraphQL, you can optionally deploy your microservice behind an enterprise API Gateway. We support two top-tier solutions out of the box:

- **Nginx**: A high-performance web server acting as a reverse proxy, pre-configured with strict security headers and rate limiting.
- **Kong (DB-less)**: A powerful API Gateway configured in a declarative (stateless) mode, leveraging plugins for rate-limiting and Key Authentication.

## Architecture

When an API Gateway is selected, the generator outputs a dedicated `deploy/gateway/` directory containing the gateway blueprints.

```text
project-root/
├── src/
├── docker-compose.yml
└── deploy/
    └── gateway/
        ├── nginx.conf (or kong.yml)
        └── docker-compose.nginx.yml (or docker-compose.kong.yml)
```

## Supported Gateways

### 1. Nginx
Nginx acts as a fast and secure reverse proxy. Our hardened blueprint includes:
- **Rate Limiting**: Throttles brute-force attempts out of the box (`10r/s`).
- **Security Headers**: Injects `X-Frame-Options`, `Content-Security-Policy`, and more to secure your downstream Node.js app.
- **Proxy Pass**: Transparently forwards traffic to the `app:3000` internal network alias.

### 2. Kong (DB-less)
Kong in DB-less mode uses a declarative `kong.yml` file, eliminating the need for an external PostgreSQL database. 
- **Rate-Limiting Plugin**: Enforces traffic control policies.
- **Key-Auth Plugin**: Protects routes using `apikey` validation, requiring consumers to pass a valid key.

## Deployment

To deploy your application with the API Gateway:

1. Spin up the Node.js application and its infrastructure (from the project root):
   ```bash
   docker-compose up -d
   ```
2. Navigate to the gateway directory:
   ```bash
   cd deploy/gateway
   ```
3. Launch the gateway container:
   ```bash
   docker-compose -f docker-compose.nginx.yml up -d
   # or docker-compose.kong.yml
   ```
