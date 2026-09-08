# ============================================================
# DEPENDENCIES
# ============================================================

FROM node:22-alpine AS deps

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./

RUN npm ci


# ============================================================
# BUILD STAGE
# ============================================================

FROM node:22-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules

COPY . .

# ------------------------------------------------------------
# Production API URLs
# ------------------------------------------------------------

ARG NEXT_PUBLIC_API_URL
ARG INTERNAL_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV INTERNAL_API_URL=$INTERNAL_API_URL

ENV NODE_ENV=production

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