---
title: "How to Host a Static Website With Github Pages"
description: "A step by step guide"
pubDate: "6 16 2023"
heroImage: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/wX2L8L-fGeA/upload/855406e38d6c04acbc88ffb32eda12de.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp
---

There are two ways to host a website on github one way is to give a special name for your github repository another way is to create a branch in your github repo named `gh-pages`.

### First I will show you how host your website by giving your repository a special name.

Create a github account if you don't have one already and navigate to the repositories tab

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1707270428975/bdea2f51-f890-44b1-9cf1-ab527aaddd9c.png" align="center"/>

Once you're on the page you'll see a `new` button on the top right, go ahead and click on it.

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1707270489879/038b76fe-9470-43c0-98eb-50cfabaf89f8.png" align="center"/>

Now this is where the magic happens, under the `Repository Name` section you'll want to type in the name of your account **exactly** followed by `.github.io` so that would be `<user>.github.io`  
Note: If the first part of your repository name doesn’t exactly match your username, it will not work.

Now you can upload a .html or .pdf or even a .md file and github will automatically host it (it may take a minute or two until its fully live). So for example if you added a `index.html` file then the URL would be `<user>.github.io/index.html`

### Secondly, I will show you how host your website by giving your repository a special branch name `gh-pages`.

This does require more knowledge of how [git](https://git-scm.com/) works. I will go step by step in order on how to accomplish this using gits cli.

You'll need to install git if you don't have it already learn how to install git for mac [here](https://git-scm.com/download/mac) and for windows [here](https://git-scm.com/download/win) and others [here](https://git-scm.com/downloads).

For this process you'll also want to have a github repository created so go ahead and do that you can call it whatever you like.

After which github provides the steps to get code to that repository which are

```markdown
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<user>/<repo-name>.git
git push -u origin main
```

In order to perform the commands above you'll want to open up your terminal and navigate to folder your website code is in. Use a `ls` command in the terminal to view all the folder and files in your current directory. Use `cd` to navigate between folders to find the folder the code you wrote is in.

After navigating to your folder

Run `git init`, this will initialize a git repository `git add .` will add all the files in your directory to the staging area `git commit -m "first commit"` will create a snapshot of files within your directory. `git branch -M main` will name your main branch main `git remote add origin https://github.com/<user>/<repo-name>.git` this command will link the resposityr you created on github to git. Be sure to replace the user and repository name with the repository you're working in `git push -u origin main` will send all the files and web changes to your github repository.

Now you should have all of your code on github.

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1707272960289/6b28a651-7925-4a23-9e1b-1e49ea64f2a7.png" align="center"/>

Within your repository navigate to where it says `main` and click on it within the search it will allow you to create a branch, make new branch called `gh-pages`. And that's it your website is now live! Your website will be available at `<user>.github.io/<repo>/`

Happy coding!
