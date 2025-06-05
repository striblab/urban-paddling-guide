# Star Tribune Urban Paddling Guide

This app is a guide to canoe/kayak/paddleboard routes in
the Twin Cities. It was originally published by the
[Star Tribune in May 2025](https://www.startribune.com/canoe-kayak-paddleboard-minnesota-twin-cities-metro-paddling-guide/601346521).

Data for the routes is managed in Airtable and loaded from
static json into the app.

## Development

To run the dev server run `npm run dev`.

To build for deployment, run `npm run build`.

## Deploying

Deployment is currently handled by a shell script (`strib-deploy.sh`). You need to have
the [AWS CLI](https://aws.amazon.com/cli/) installed with credentials for the
static.startribune.com bucket using the 'default' profile.

To deploy to staging, run `npm run deploy-staging`. For production, run
`npm run deploy-production`. This will upload to a typical path using your
project's name, which is read from the root directory of your project
(where `package.json` is located).
