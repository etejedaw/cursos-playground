FROM node:20.11.1-alpine as builder
WORKDIR "/usr/app"
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine as runner
COPY --from=builder "/usr/app/dist" "/usr/share/nginx/html"