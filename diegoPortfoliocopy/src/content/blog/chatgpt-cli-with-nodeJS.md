---
title: "ChatGPT CLI with NodeJS"
description: "Beginner friendly ~50 lines of code"
pubDate: "12 14 2023"
heroImage: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/95YRwf6CNw8/upload/1f679a5cce18eb8af26bb6993ace837b.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp
---

Dependencies:

- NodeJS (node can be installed with [NVM](https://github.com/nvm-sh/nvm) this must be done before continuing any further)
- openai ( Use [NPM](https://www.npmjs.com/package/openai) to install openai)
- dotenv (Use [NPM](https://www.npmjs.com/package/dotenv))

Open up a new folder for development, I called mine gpt-cli

1. In your folder Run `npm init -y` this will create your `package.json` file the `-y` just says yes to the default configuration for your `package.json`

   1. In the package.json file let's make sure we can use ES modules and add `"type" : "module"`. To learn more about ES modules, see [here](https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling). Your package.json should now look like the code below

      ```json
      {
        "name": "gpt-cli",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "type": "module",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC"
      }
      ```

2. Let's start by installing all of our dependencies, open up your terminal and run...

   1. `npm i openai`
   2. `npm i dotenv` - this will allow us to load environment variables or keys from a .env file

3. Create a file called `chat.js`

   1. In the first line of the file write `#! /usr/bin/env node`
   2. The line will appear/act just like a comment only if written on the first line and if you run your application with NodeJS. The `#!` is known as a [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) and will tell your computer the file is an executable. The `/usr/bin/env node` tells the computer to execute the file with a Node interpreter and `/user/bin/env` is where the computer will find the interpreter.

4. More code:

   1. ```javascript
      import "dotenv/config";
      import readline from "node:readline";
      import OpenAI from "openai";

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      ```

      This piece of code imports all of our dependencies and we initialize our OpenAI API client we pass our key as an argument `process.env.OPENAI_API_KEY` will grab the OpenAI key once we pass it to our computer in a .env file.

   2. The readline interface is a Node module that will allow us to provide an interface for reading data from a stream, like [`process.stdin`](https://nodejs.org/api/process.html#processstdin) which comes from the terminal.

5. Next, let's create a function that will create a model based of a conversation with GPT. The GPT model I chose is `gpt-3.5-turbo` but you can add the one you'd like to use. The message property will take a list of messages comprising the conversation so far. The temperature property will tell how creative GPT is to be in this case I set it to 1 which is pretty much medium creativity/factuality.

   1. ```javascript
      const newMessage = async (history, message) => {
        const results = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [...history, message],
          temperature: 1,
        });

        return results.choices[0].message;
      };
      ```

6. Now let's create a function to format our messages to GPT

   1. `const formatMessage = (userInput) => ({ role: "user", content: userInput });`
   2. the `role: "user"` tells GPT that we are sending messages as a user there are other roles like "system" which will give GPT a back story and set the behavior of GPT.

7. Now let's create a function called `chat` that will finish off our chat functionality.

   1. ```javascript
      const chat = () => {
        const history = [
          {
            role: "system",
            content:
              "You are an AI assistant answer the questions to the best of your ability",
          },
        ];
        const start = () => {
          rl.question("You: ", async (userInput) => {
            if (userInput.toLowerCase() === "exit") {
              rl.close();
              return;
            }

            const userMessage = formatMessage(userInput);
            const response = await newMessage(history, userMessage);
            history.push(userMessage, response);
            console.log(`\n\nGPT: ${response.content}`);
            start();
          });
        };
        start();
      };
      console.log("ChatGPT initialized. Type 'exit' to end the chat.");
      chat();
      ```

      The history array will give GPT its behavior in this case it is an AI assistant, it will also be where we push all the current and previous responses :)

   2. We also have a recursive function called `start()` where we check if the user has inputted the word `exit` if the user has, then we close the interface we MUST close it as the `readline.interface` will wait for data to be received on the `input` stream. Learn more [here](https://nodejs.org/api/readline.html#readline).
   3. We read the user input with a readline, then we format the message and pass the history of the conversation we also pass the `userMessage` where we wait for GPT's response. We push the response to the history array to make sure we keep track of the conversation.

8. Finally, get your Openai key from [here](https://platform.openai.com/api-keys) and run the following command in your terminal

   1. `export OPENAI_API_KEY="your api key"`
   2. This will add the key to your `.env` in your computer and allow node to read from it
   3. Go back to your `package.json` and add the following `"bin": { "chatgpt": "chat.js"}` the "chatgpt" will tell npm that that is the command you wish to run to start your CLI the value will tell what files to run as part of the CLI, in this case, we only have one that is `chat.js`.

      ```json
      {
        "name": "gpt-cli",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "type": "module",
        "bin": {
          "chatgpt": "chat.js"
        },
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
          "dotenv": "^16.3.1",
          "openai": "^4.21.0"
        }
      }
      ```

9. Now in your terminal run `npm i -g` this will download your code as an npm package. Congratulations you now have a working CLI that you can run anywhere from within your terminal by running `chatgpt`.

### The code

```javascript
#! /usr/bin/env node

import "dotenv/config";
import readline from "node:readline";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newMessage = async (history, message) => {
  const results = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...history, message],
    temperature: 1,
  });

  return results.choices[0].message;
};

const formatMessage = (userInput) => ({ role: "user", content: userInput });

const chat = () => {
  const history = [
    {
      role: "system",
      content:
        "You are an AI assistant answer the questions to the best of your ability",
    },
  ];
  const start = () => {
    rl.question("You: ", async (userInput) => {
      if (userInput.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      const userMessage = formatMessage(userInput);
      const response = await newMessage(history, userMessage);
      history.push(userMessage, response);
      console.log(`\n\nGPT: ${response.content}`);
      start();
    });
  };
  start();
};

console.log("Chatbot initialized. Type 'exit' to end the chat.");
chat();
```
