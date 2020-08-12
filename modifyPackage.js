const fs = require('fs');

fs.readFile('package.json', 'utf8', (err, data) => {
  if (err) console.info(err.message);

  const parsedJson = JSON.parse(data);

  parsedJson.scripts.m = 'sequelize db:migrate && sequelize db:migrate --env test';
  delete parsedJson.devDependencies['chai-http']
  delete parsedJson.dependencies.passport
  delete parsedJson.dependencies['passport-facebook']
  delete parsedJson.dependencies['passport-google-oauth20']
  delete parsedJson.dependencies['passport-jwt']
  delete parsedJson.dependencies['passport-local']
  delete parsedJson.dependencies['password-validator']

  fs.unlinkSync('package.json');
  fs.writeFileSync('package.json', JSON.stringify(parsedJson, null, 2));
});
