# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:22-alpine AS builder

# Upgrade npm to fix high-severity vulnerabilities (SNYK-JS-GLOB, SNYK-JS-MINIMATCH)
RUN npm install -g npm@11.6.4

WORKDIR /app
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

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

# Upgrade npm to fix high-severity vulnerabilities
RUN npm install -g npm@11.6.4

WORKDIR /app

ENV NODE_ENV=production
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production --ignore-scripts --no-audit --no-fund || npm ci --only=production --ignore-scripts --no-audit --no-fund || npm ci --only=production --ignore-scripts --no-audit --no-fund

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

CMD ["npm", "start"]
