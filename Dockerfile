FROM node:latest AS Backend

RUN mkdir -p /wrightsite/src

WORKDIR /wrightsite/src

COPY package*.json ./

RUN npm install

EXPOSE 8080

COPY ./src .

CMD ["npm", "start"]
