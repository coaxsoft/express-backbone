## Branches description

 - `dev` - worked version "REST + PostgreSQL"
 - `core` - core part
 - `core_dev` - commit here to improve the core part. Then pull request to `core`
 - `REST_PostgreSQL` - contains the controllers and model for the "REST + PostgreSQL" build
 - `REST_PostgreSQL_dev` - commit here to improve "REST + PostgreSQL" build. Then pull request to `REST_PostgreSQL`

## How to build && test

 - get the `sh` script (currently in development)
 - make the working `.env` file connected to the test database. It's needed for testing
 - make sure `.env` && `script.sh` are in the same directory.
 - run `bash script.sh`

## REST + PostgreSQL setup

 - copy `.env.example` to `.env` and set up credentials
 - execute `npm run m`
 
## Available Scripts

 - `npm start` runs server with native node 
 - `npm run dev` runs with nodemon for development
 - `npm run lint` checks your code with ESLint.
 - `npm test` runs all test from /test folder
 - `npm run coverage` to check your code test coverage
 
