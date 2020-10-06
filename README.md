# client-lottery-detection

- Demo:
  - Youtube: https://youtu.be/-4aEPRcZB0U
  - GIF: 
  ![](demo-gif.gif)

## About this project

- When struggling to search for lottery results, I came up with the idea to build an app which allows user to upload lotter photos and return them the final results
- I know this idea could only be beneficial to a minority of people, but I treated this as a pet project. It is fun to build your idea into a real workable thing.

## Tech stack used in this project

- I use Vue boilerplate to create a simple Vue app up and running
- Nodejs is used in the server side to process image and analyze text as well as crawling lottery prizes data. Especially, I used Google Cloud Vision service to extract text from lottery image. Google service was a great choice except from its price. But I have 1000 free requests per month for this pet project which is totally cool. Anyone interested can have a look at my server code here: https://github.com/ngochangjelly/lottery-image-detection

## Project setup

- First, you need to clone server code here: https://github.com/ngochangjelly/lottery-image-detection, then

- Based on README in that repo, make sure the server is up and running

For frontend, use these commands:

### Install packages and dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Remove unused NPM packages

npm prune

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Which can be further improved

I temporarily stop develop other features and decided to wrap it up now. But there are a lot you can think to improve this:

- On mobile mode, when user taking picture of the lottery, sometimes it rotate vertically. We can handle to auto rotate the lottery to the right direction before starting to extract text
- Allow user to upload images in bulk and process them all at once
- Implement HTTP rate limit to prevent a user from requesting to many times
