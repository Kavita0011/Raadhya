# ---------- Builder Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install ALL dependencies (including devDependencies)
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the frontend and server
RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built output from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Create secure non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S raadhya -u 1001
RUN chown -R raadhya:nodejs /app
USER raadhya

# Expose your app port
EXPOSE 10000

# Optional health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:7860/api/security/stats', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Run the app
CMD ["node", "dist/index.js"]
