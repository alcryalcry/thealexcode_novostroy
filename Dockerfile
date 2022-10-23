FROM node:12.16.3-alpine3.9

RUN mkdir -p /var/www/dockerize-nuxt/novostroy
WORKDIR /var/www/dockerize-nuxt/novostroy

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000

CMD [ "npm", "start" ]