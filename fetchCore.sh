coreBranch="core"
repoName="express-backbone"
downloadLink=https://codeload.github.com/coaxsoft/"$repoName"/zip/

curl -L "$downloadLink""$coreBranch" | tar zx

cp "$repoName"-"$coreBranch"/package.json package.json
mkdir "bin"
cp "$repoName"-"$coreBranch"/bin/www bin/www
cp "$repoName"-"$coreBranch"/.env.example .env.example

rm -rf "$repoName"-"$coreBranch"

node modifyPackage.js

npm install

npm i --save $(<packages.txt)

bash dbSetup.sh
