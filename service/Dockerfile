FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./

RUN yarn install --production

COPY dist ./dist
COPY .env.example .env.example
COPY .env.production .env

ENV NODE_ENV production

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
USER node
