dbBranch="PostgreSQL_DB_setup"

curl -L https://codeload.github.com/Myrko-SM/express-backbone/zip/"$dbBranch" | tar zx

cp express-backbone-"$dbBranch"/.sequelizerc .sequelizerc
rsync -av express-backbone-"$dbBranch"/app/db app/

rm -rf express-backbone-"$dbBranch"
