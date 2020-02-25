# https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

FROM node:10

# Create app directory to hold the application code inside the image
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# To bundle your app's source code inside the Docker image
COPY . .

EXPOSE 3333
CMD npm run dev && npm run queue
# CMD ["npm", "run", "dev"]
# CMD [ "node", "server.js" ]
