FROM node:lts-alpine AS runtime
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=runtime /app/dist /usr/share/nginx/html
EXPOSE 80