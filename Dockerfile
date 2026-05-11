# Using oven/bun directly will cause node version to be too old, so we need to install bun manually
# Alpine causes glibc issues with cn-font-split, so we use Debian slim for the build stage and Nginx alpine for the static deployment stage
FROM node:26-bookworm-slim AS build-stage
WORKDIR /app

RUN apt-get update && apt-get install -y curl unzip && \
    npm install -g bun && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock* ./

RUN bun install

COPY . .

RUN bun run build

FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]