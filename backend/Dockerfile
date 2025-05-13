FROM node:18-slim

WORKDIR /app

# Install required dependencies
RUN apt-get update && \
    apt-get install -y openssl netcat-traditional && \
    rm -rf /var/lib/apt/lists/*

# Copy the entire application first
COPY . .

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Add node options for ES modules
ENV NODE_OPTIONS="--experimental-specifier-resolution=node"

# Make the startup script executable
RUN chmod +x /app/scripts/init-db.sh

EXPOSE 3001

# Use the startup script
ENTRYPOINT ["/bin/sh", "/app/scripts/init-db.sh"] 