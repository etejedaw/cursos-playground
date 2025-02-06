FROM node:20-alpine
WORKDIR /app
COPY main.js ./
RUN npm i @actions/core @actions/exec aws-cli
ENTRYPOINT ["node", "main.js"]
