FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3030

ENTRYPOINT [ "node" ]

CMD [ "index.js" ]