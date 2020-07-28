## Branches description

 - `dev` - working version "REST + PostgreSQL"
 - `core` - core part. Base core for all builds
 - `REST_PostgreSQL` - contains the controllers and model for the "REST + PostgreSQL" build

## How to build && test

 - get the `sh` script (currently in development) - ask Myrko.
 - make the working `.env.example` file connected to the test database. It's needed for testing
 - make sure `.env.example` && `script.sh` are in the same directory.
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
 
