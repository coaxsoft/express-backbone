# -- gather variables ---
if [ -z "$dbBranch" ]; then
    dbBranch="PostgreSQL_DB_setup"
fi

if [ -z "$repoName" ]; then
    repoName="express-backbone"
fi

if [ -z "$downloadLink" ]; then
    downloadLink=https://codeload.github.com/Myrko-SM/"$repoName"/zip/
fi

# --------

curl -L "$downloadLink""$dbBranch" | tar zx

cp "$repoName"-"$dbBranch"/.sequelizerc .sequelizerc
rsync -av "$repoName"-"$dbBranch"/app/db app/

rm -rf "$repoName"-"$dbBranch"
