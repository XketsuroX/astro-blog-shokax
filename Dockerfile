FROM node:22.12-alpine AS build-stage
# Using oven/bun directly will cause node version to be too old, so we need to install bun manually
WORKDIR /app

RUN npm install -g bun


COPY package.json bun.lock* ./

RUN bun install

COPY . .

RUN bun run build

FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]