FROM node:16.16.0-alpine3.15 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:16.16.0-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:16.16.0-alpine3.15 AS runner
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]