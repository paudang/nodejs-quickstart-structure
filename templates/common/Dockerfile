# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:22-alpine AS builder

# Upgrade OS packages to fix upstream vulnerabilities (Snyk-detected)
RUN apk update && apk upgrade && \
    apk add --no-cache ca-certificates zlib>=1.3.2-r0 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main

WORKDIR /app
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

# Upgrade npm using corepack (safer in Alpine)
RUN corepack enable && corepack prepare npm@11.6.4 --activate

COPY package*.json ./
COPY tsconfig*.json ./

# Install ALL dependencies (including devDeps for build)
RUN npm ci --no-audit --no-fund || npm ci --no-audit --no-fund || npm ci --no-audit --no-fund

COPY . .

# Build for production
<% if (language === 'TypeScript') { %>RUN npm run build<% } %>

# ==========================================
# Stage 2: Production
# ==========================================
FROM node:22-alpine AS production

# Upgrade OS packages to fix upstream vulnerabilities (Snyk-detected)
RUN apk update && apk upgrade && \
    apk add --no-cache ca-certificates zlib>=1.3.2-r0 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main

WORKDIR /app

ENV NODE_ENV=production
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

# Upgrade npm using corepack (safer in Alpine)
RUN corepack enable && corepack prepare npm@11.6.4 --activate

COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production --ignore-scripts --no-audit --no-fund || npm ci --only=production --ignore-scripts --no-audit --no-fund || npm ci --only=production --ignore-scripts --no-audit --no-fund

# Remove npm and caches to achieve Zero-Vulnerability status in the final image
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm /root/.cache

# Copy built artifacts from builder
<% if (language === 'TypeScript') { %>
COPY --from=builder /app/dist ./dist
<% } else { %>
COPY --from=builder /app/src ./src
<% } %>

# Copy other necessary files (like views if MVC)
<% if (viewEngine && viewEngine !== 'None') { %>
COPY --from=builder /app/src/views ./dist/views
<% if (viewEngine && viewEngine !== 'None') { %>COPY --from=builder /app/public ./public<% } %>
<% } %>

EXPOSE 3000

# Create logs directory and give permissions to node user
RUN mkdir -p logs && chown -R node:node logs

USER node

# Start application directly with node (safe even without npm)
CMD ["node", "<% if (language === 'TypeScript') { %>dist/index.js<% } else { %>src/index.js<% } %>"]
