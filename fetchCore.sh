coreBranch="core"

curl -L https://codeload.github.com/Myrko-SM/express-backbone/zip/"$coreBranch" | tar zx

cp express-backbone-"$coreBranch"/app/app.js app/app.js
cp express-backbone-"$coreBranch"/package.json package.json
mkdir "bin"
cp express-backbone-"$coreBranch"/bin/www bin/www
cp express-backbone-"$coreBranch"/.env.example .env.example

rm -rf express-backbone-"$coreBranch"

npm install

npm i --save $(<packages.txt)
