## Verisoul Web Sample App

### Overview
The purpose of this app is to demonstrate Verisoul's Javascript SDK by use of the npm module. The repository contains a [React](https://reactjs.org/) app that uses Verisoul NPM package `@verisoul/ui` alongside an [Express](https://expressjs.com/) API server. 

### Getting Started
1. Clone the repository
```angular2html
git clone https://github.com/verisoul/web-sample-app.git && cd web-sample-app
```
2. Copy `.env.example` to `.env` and fill in the `VERISOUL_API_KEY` and `NPM_TOKEN` values
```angular2html
cp .env.example .env
```
3. Install dependencies
```angular2html
npm install
```
4. Start the app server locally at `http://localhost:5001`
```angular2html
node backend/server.js
```
5. Run the app on your browser at `http://localhost:4001`
```angular2html
npm start
```

### Questions and Feedback
Comprehensive documentation about Verisoul's Javascript SDK and API can be found at [docs.verisoul.xyz](https://docs.verisoul.xyz/). Additionally, reach out to Verisoul at [support@verisoul.xyz](mailto:support@verisoul.xyz) for any questions or feedback.
