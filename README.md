## Branches description

 - `dev` - working version "REST + PostgreSQL"
 - `core` - core part. Base core for all builds without the database connected and with one test api endpoint.
 - `REST_PostgreSQL` - contains the controllers and model for the "REST + PostgreSQL" build

## How to build && test

 - get the `sh` script (currently in development) - ask Myrko.
 - make the working `.env.example` file connected to the test database. It's needed for testing
 - make sure `.env.example` && `script.sh` are in the same directory.
 - run `bash script.sh`

## REST + PostgreSQL setup && development

 - run `git checkout REST_PostgreSQL`
 - run `bash fetchCore.sh`
 - copy `.env.example` to `.env` and set up credentials
 - execute `npm run m`
 - run `npm run test`
 
## Core setup && development

 - run `git checkout core`
 - copy `.env.example` to `.env` and set up credentials
 - execute `npm run m`
 - run `npm run test`
 - `app/routes/apiRoutes` with "test" endpoint on the branch core is only for testing purpose. it will be replaced in the build.
