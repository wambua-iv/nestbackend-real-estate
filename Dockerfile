FROM node:lts

WORKDIR /usr/api

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn global add rimraf

RUN rimraf ./dist

COPY . .

CMD ["yarn", "start:dev"]