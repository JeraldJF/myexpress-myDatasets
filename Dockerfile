

FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

COPY .env ./


RUN npm install dotenv

ENV NODE_ENV=development

EXPOSE 3006

CMD [ "node", "./dist/routes/dataSets.js" ]