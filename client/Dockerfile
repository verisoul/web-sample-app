FROM node:16

WORKDIR /client
COPY . .

# install dependencies
ARG NPM_TOKEN
RUN npm install
RUN rm -f .npmrc

CMD npm start

