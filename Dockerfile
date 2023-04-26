FROM node:14

WORKDIR /food_app_BE

COPY package*.json ./

RUN npm install

VOLUME /food_app_BE

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "dev"]
