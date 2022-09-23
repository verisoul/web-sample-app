FROM node:16 AS build-stage

WORKDIR /client
COPY . .

# install dependencies
ARG NPM_TOKEN
RUN npm install
RUN rm -f .npmrc

RUN npm run build

FROM nginx:1.17.0-alpine

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=build-stage /client/public /usr/share/nginx/html
COPY --from=build-stage /client/nginx.conf /etc/nginx/nginx.conf
EXPOSE $CLIENT_DOCKER_PORT

ENTRYPOINT ['nginx', '-g', 'daemon off;', '-c', '']
#CMD nginx -g 'daemon off;'

