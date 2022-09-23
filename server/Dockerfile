FROM node:16

WORKDIR /server
COPY package.json .

# Download dependencies
RUN npm install
COPY . .

# Start server
CMD npm start