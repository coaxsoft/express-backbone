const fs = require("fs");

fs.readFile("package.json", "utf8", function(err, data) {
    const parsedJson = JSON.parse(data);

    parsedJson.scripts["m"] = "sequelize db:migrate && sequelize db:migrate --env test";

    fs.unlinkSync("package.json");
    fs.writeFileSync("package.json", JSON.stringify(parsedJson, null, 2));
});
