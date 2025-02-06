FROM node:iron-alpine AS base
WORKDIR "/usr/app"
COPY package*.json ./
RUN npm ci

FROM node:iron-alpine AS builder
WORKDIR "/usr/app"
COPY --from=base "/usr/app/node_modules" "./node_modules"
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:iron-alpine AS runner
WORKDIR "/usr/app"
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder "/usr/app/dist" "./dist"
CMD ["npm", "run", "start"]