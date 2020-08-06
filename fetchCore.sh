coreBranch="core"

curl -L https://codeload.github.com/Myrko-SM/express-backbone/zip/"$coreBranch" | tar zx

cp express-backbone-"$coreBranch"/package.json package.json
mkdir "bin"
cp express-backbone-"$coreBranch"/bin/www bin/www
cp express-backbone-"$coreBranch"/.env.example .env.example

rm -rf express-backbone-"$coreBranch"

node modifyPackage.js

npm install

npm i --save $(<packages.txt)
npm i --save-dev $(<dev-packages.txt)
