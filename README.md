# Turkey Learning Initiative API

[![CI](https://github.com/TurkeyLearningInitiative/api/actions/workflows/workflows.yml/badge.svg?branch=main)](https://github.com/TurkeyLearningInitiative/api/actions/workflows/workflows.yml)

## Tech Stack
- Node.js & Nest.js (Express.js)
- Mongo DB
- AWS S3

# Running the Project

Install the node dependencies with "yarn" or "npm" install
```console
yarn install
```
Create an environment variable called "DB_URI". If you're using Webstorm you can do it from "Configurations" on the top right corner, or you can create a .env file.

.env file:
```
DB_URI=/contact bedirhan or furkan for the connection string/
```

To start the application run:

```console
yarn start:dev
```

# Swagger

The Swagger documentation is located at localhost:3000/docs
