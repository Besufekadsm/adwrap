FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create public directory if it doesn't exist
RUN mkdir -p public

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public/ ./public/
COPY --from=builder /app/node_modules ./node_modules

# Set permissions
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 