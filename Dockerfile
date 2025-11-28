FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN cp .env.docker .env
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
