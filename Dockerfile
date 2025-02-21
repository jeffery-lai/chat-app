# Use a lightweight Node.js image
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build the React app
COPY public /app/public
COPY src /app/src
COPY index.html /app/
COPY vite.config.js /app/
RUN npm run build

# Serve the React app using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for web traffic
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
