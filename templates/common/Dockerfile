# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

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

WORKDIR /app

ENV NODE_ENV=production

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
