FROM node:16

WORKDIR /server
COPY package.json .

# Download dependencies
RUN yarn
COPY . .

# Start server
CMD yarn start