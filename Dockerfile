# Stage 1: Build the React/Vite application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production Node.js Server + PostgreSQL Client + Automatic Cron Job
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80
ENV CRON_INTERVAL_HOURS=6

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY server ./server
COPY scripts ./scripts

# Local fallback cache volume if DATABASE_URL is not set
RUN mkdir -p /app/.cache

EXPOSE 80

CMD ["node", "server/index.mjs"]
