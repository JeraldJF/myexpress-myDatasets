

FROM node:18-alpine

ENV NODE_ENV=production
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "node", "./public/typescripts/dataSets.js" ]