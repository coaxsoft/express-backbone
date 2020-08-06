const fs = require('fs');

fs.readFile('package.json', 'utf8', (err, data) => {
  if (err) console.info(err.message);

  const parsedJson = JSON.parse(data);

  parsedJson.scripts.m = 'sequelize db:migrate && sequelize db:migrate --env test';

  fs.unlinkSync('package.json');
  fs.writeFileSync('package.json', JSON.stringify(parsedJson, null, 2));
});
