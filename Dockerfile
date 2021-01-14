FROM node:latest

RUN mkdir /wrightapp/src

WORKDIR /wrightapp/src

COPY package*.json .

RUN npm install

COPY . /src

EXPOSE 5000

CMD ["npm", "start"]