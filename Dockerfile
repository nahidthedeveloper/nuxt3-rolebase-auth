FROM node:22.11.0-alpine

WORKDIR /app

COPY ./package*.json ./yarn.lock /app/

RUN yarn install && yarn add @pinia/nuxt && yarn cache clean

COPY . /app/

RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]
