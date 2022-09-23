FROM node:16

WORKDIR /client
COPY . .

# install dependencies
ARG NPM_TOKEN
RUN yarn
RUN rm -f .npmrc

CMD yarn start

