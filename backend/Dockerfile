FROM node:18-alpine

WORKDIR /app

# Install OpenSSL and netcat
RUN apk add --no-cache openssl netcat-openbsd

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 3001

# Use development mode
CMD ["npm", "run", "dev"] 