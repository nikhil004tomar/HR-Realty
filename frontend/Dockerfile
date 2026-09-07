# ============================================================
# BUILD STAGE
# ============================================================

FROM node:22-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# ============================================================
# PRODUCTION STAGE
# ============================================================

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Next.js standalone server
COPY --from=builder /app/.next/standalone ./

# Static Next.js files
COPY --from=builder /app/.next/static ./.next/static

# Public files
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]