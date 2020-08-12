## Branches description - DONT MERGE THESE BRANCHES TOGETHER! 

 - `dev` - working version "REST + PostgreSQL"
 - `core` - core part. Base core for all builds without the database connected and with one test api endpoint.
 - `PostgreSQL_DB_Setup` - contains DB migrations and models for PostgreSQL database. Sequelize ORM.
 - `REST_PostgreSQL` - contains the controllers and model for the "REST + PostgreSQL" build
 - `GraphQL_PostgreSQL` - contains the controllers and model for the "GraphQL + PostgreSQL" build

## How to build

 - get the `sh` script (currently in development) - ask @Myrko-SM.
 - run `bash script.sh`
 
## Build with tests

 - make the working `.env.example` file connected to the test database. It's needed for testing
 - make sure `.env.example` && `script.sh` are in the same directory.
 - run `bash script.sh test`. it will run the tests inside the build.

## REST + PostgreSQL setup && development

 - run `git checkout REST_PostgreSQL`
 - check `dbSetup.sh` - set proper repo name
 - run `bash fetchCore.sh` - check this file and set proper repo name
 - copy `.env.example` to `.env` and set up credentials
 - execute `npm run m`
 - run `npm run test`
 
## GraphQL + PostgreSQL setup && development

 - run `git checkout GraphQL_PostgreSQL`
 - check `dbSetup.sh` - set proper repo name
 - run `bash fetchCore.sh` - check this file and set proper repo name
 - copy `.env.example` to `.env` and set up credentials
 - execute `npm run m`
 - run `npm run test`
 
## Core setup && development

 - run `git checkout core`
 - copy `.env.example` to `.env` and set up credentials
 - run `npm install`
 - run `npm run test`
 - `app/routes/apiRoutes` with "test" endpoint on the branch core is only for testing purpose. it will be replaced in the build.
