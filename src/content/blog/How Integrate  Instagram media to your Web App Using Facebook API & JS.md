---
title: "How Integrate  Instagram media to your Web App Using Facebook API & JS"
description: "Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro."
pubDate: "12 03 2023"
---

**Dependencies**:

- Node.js / Astro.js ( if you don't have node follow this [guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) to get it installed. Astro will be installed later in this artcile)
- [Facebook developer account](https://developers.facebook.com/)
- Access to an Instagram account

# To create a web app that displays Instagram media posts, you can use **AstroJS**, a modern web framework that is easy to learn and use. Here are the steps:

1. First, you need to create an Facebook developer account and register your app to get an access token. You can follow the instructions provided in the [official Facebook](https://developers.facebook.com/docs/development/create-an-app) developer documentation to do this or follow along here.

   1. For Step 1 "Choosing an App Type" you choose the first option "Consumer"

      <img src= "https://cdn.hashnode.com/res/hashnode/image/upload/v1701622115235/5e8d29fc-780b-4757-8d6b-55a06bc4dad1.png" align="center"/>

   2. Got to App Settings scroll down and "Add a Platform". Choose website add the url if you don't yet have a url add [http://localhost:3000/](http://localhost:3000/). This is necessary, if you don't add this facebook will not allow you to setup your instagram basic display app.
   3. In the App Dashboard scroll down and choose "Instagram Basic Display"

     <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1701622498665/4e78c1d2-fa6d-4d86-a7db-0b6a20da54a0.png" align="center"/>

   4. Next we will add a user in order to get API key navigate to "Instagram Basic Display" and click on "Basic Display"

      <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1701622865518/5578a68c-d5d0-455d-ac75-544d11104b12.png" align="center" />

      In the page hit add [**Add or Remove Instagram Testers**](https://developers.facebook.com/apps/190646347460845/roles/roles/) This will bring you to a new page where you can add a tester the last is the one you want titled "Instagram Tester". Search the instagram user you would like to add. This is necessary in order to get a api key to query data from.

   5. After adding the tester you will need to allow access through the "testers" instagram account go to [Apps and Websites](https://www.instagram.com/accounts/manage_access/?fbclid=IwAR0yrTmMTN-ao3yS5UOX8SukiTbjtsF9wQhvzVOUTwC4UvpsTn93N2fN1L4) in settings of Instagram to allow access.

2. We now have the access token, you can use the Instagram Basic Display API to fetch media posts from your Instagram account. You can use any HTTP client library to make requests to the API endpoints.

   1. to keep this token safe we will be putting it into a .env file and adding it to our .gitignore file.

3. Next, you can use AstroJS to create a web app that displays the media posts. AstroJS provides a simple and intuitive API for building web apps, and it supports a wide range of features such as server-side rendering, static site generation, and more. You can follow the [official AstroJS documentation](https://docs.astro.build/en/getting-started/) to learn more about how to use the framework.

   1. Now we can start coding navigate to a directory in your computer where you don't mind creating a new folder
   2. run `npm create astro@latest` in your terminal

      1. follow the prompts and I'll see you on the other side

   3. You should now have a project with basic files to create this app. In the root directory add a .env file. Within the file add `INSTAGRAM_API_KEY='your api key'`. Don't worry astro already created a `.gitnignore file` that ignores this file so go ahead and commit your changes.
   4. Now we can have some fun navigate to `src/pages/index.astro`
   5. ```xml
      ---

      ---

      <html lang="en">
      	<head>
      		<meta charset="utf-8" />
      		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      		<meta name="viewport" content="width=device-width" />
      		<meta name="generator" content={Astro.generator} />
      		<title>Astro</title>
      	</head>
      	<body>
      		<h1>Astro</h1>
      	</body>
      </html>
      ```

      Within the --- --- we're going add our sever side code. Astro JS wil the code inside of there once for every page load.

   6. ```javascript
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,username,media_url,media_type,timestamp,caption,permalink,thumbnail_url&access_token=${
          import.meta.env.INSTAGRAM_API_KEY
        }`
      );

      const data = await response.json();
      const IMG = data["data"];
      ```

      this will fetch the data we need from the user's account notice the fields option in the url it has a comma separated list asking for the id, username, media_url, media_type, timestamp, caption, permalink and thumbnail_url. This will be returned for every instagram post here's and example of what that would look like:  
      { "id": "17895695668004550", "media_type": "IMAGE", "media_url": "[https://fb-s-b-a.akamaihd.net/](https://fb-s-b-a.akamaihd.net/)...", "username": "jayposiris" "timestamp": "2017-08-31T18:10:00+0000" }

      The `import.meta.env.INSTAGRAM_API_KEY` will be filled in with the api key we setup in the .env file to learn more about how this works see [**Using environment variables**](https://docs.astro.build/en/guides/environment-variables/)**.**

   7. Now that we have the data lets do something with it in the body tag add this code

      ```javascript
      {
        IMG.map((el) => (
          <div>
            {el.media_type == "IMAGE" ? (
              <img src={el.media_url} alt="" />
            ) : (
              <video
                poster={el.thumbnail_url}
                controls
                playsinline
                preload="none"
              >
                <source src={el.media_url} type="video/webm" />

                <source src={el.media_url} type="video/mp4" />
              </video>
            )}
            <a href={el.permalink}>
              <div>
                <span>{el.caption}</span>
                <span>{new Date(el.timestamp).toDateString()}</span>
              </div>
            </a>
          </div>
        ));
      }
      ```

   8. Now, we should have everything setup run `npm run dev` this will start the project in a local host in your browser navigate to [`http://localhost:4321/`](http://localhost:4321/) . If everything worked correctly you should see images or videos! Next I will explain the code and after which you can style and continue your project however you like.
   9. In the code we run through the data that's returned and with the Map function creates a new array populated with the results of array it was previously called on. That's useful for us because we want to display the contents of the array.
   10. To make sure we keep our webpage semantic we use the terneary operator to check wether its an image or video and display it using a `img` tag or a `video` tag.
   11. We grab the content of each post by using the `.` which allows us access the properties within each post like the caption, media_url, and timestamp.

4. Now we have a fully working application that is poorly styled, but it works! Next you can deploy this project to using something like [Netlify](https://www.netlify.com/). To use the full capabilities of the api visit the facebook [docs](https://developers.facebook.com/docs/instagram-basic-display-api). Happy coding!
