git checkout -b new-post
git add .
git commit -m "hey, my new post. Done for today"
git push

git branch -d new-post
git push origin --delete new-post
