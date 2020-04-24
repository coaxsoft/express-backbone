## How to setup?

 - execute `npm install`
 - copy `.env.example` to `.env` and set up credentials
 - execute `npx sequelize-cli db:migrate` (environment can be set via `--env test`)
 - execute `npx sequelize-cli db:seed:all`
 - now you are ready to run scripts
 
## Available Scripts

 - `npm start` runs server with native node 
 - `npm run dev` runs with nodemon for development
 - `npm run lint` checks your code with ESLint.
 - `npm test` runs all test from /test folder
 - `npm run coverage` to check your code test coverage
 
 ## Must have
 
 get yourself familiar with [sequelize](https://sequelize.org/master/index.html) and [sequelize-cli](https://github.com/sequelize/cli) documentation