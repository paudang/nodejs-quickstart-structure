FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf || true

# Copy custom configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
