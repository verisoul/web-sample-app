# Verisoul Web Sample App

## Overview
The purpose of this app is to demonstrate Verisoul's Javascript SDK by use of the private npm module. The repository contains a [React](https://reactjs.org/) app that uses Verisoul NPM package `@verisoul/ui` alongside an [Express](https://expressjs.com/) API server.

_To run the app a Verisoul API Key, Project ID and NPM token are required._ Schedule a call [here](https://meetings.hubspot.com/henry-legard) to get started. 

## Getting Started
1. Clone the repository
```bash
git clone https://github.com/verisoul/web-sample-app.git && cd web-sample-app
```
2. Copy your `NPM_TOKEN` into the `.npmrc` file

3. Copy `.env.sample` to `.env` and fill in the `VERISOUL_API_KEY`, `VERISOUL_PROJECT_ID`, and `NPM_TOKEN` values before sourcing the file.
```bash
cp .env.sample .env
```
4. Install dependencies
```bash
npm install
```
5. Run the app at `http://localhost:4001`
```bash
npm start
```

## Questions and Feedback
Comprehensive documentation about Verisoul's Javascript SDK and API can be found at [docs.verisoul.xyz](https://docs.verisoul.xyz/). Additionally, reach out to Verisoul at [support@verisoul.xyz](mailto:support@verisoul.xyz) for any questions or feedback.

## Troubleshooting
If you are running into issues running the app make sure you have copied `node_modules/@verisoul/ui/auth-sdk` into your build. You can specify the directory in the SDK by setting `models_path`. This is done for you in the sample app like so:
```javascript
new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'node_modules/@verisoul/ui/auth-sdk'),
                    to: path.resolve(__dirname, 'public/js/auth-sdk'),
                },
            ],
        }),
```
The `auth-sdk` contains anti-spoofing models written in web assembly that are required to be served on the same origin. 