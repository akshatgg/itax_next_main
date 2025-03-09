# Stage 1: Install dependencies
FROM node:18-alpine AS builder

WORKDIR /app

# Install required dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY package.json package-lock.json ./

# Expose port 3001 for Next.js
EXPOSE 3001

# Run Prisma migrations (optional, only for dev environments)
CMD npx prisma migrate deploy && npm run dev
