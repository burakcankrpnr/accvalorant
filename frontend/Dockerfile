FROM node:lts
WORKDIR /usr/src/app

EXPOSE 5000

COPY package*.json ./
RUN npm install --force

COPY . .

CMD ["node", "server.js"]
