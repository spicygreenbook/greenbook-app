# greenbook-app
Code base for the android, ios, and responseive web apps for [spicygreenbook.org](https://spicygreenbook.org) which is a directory of local black-owned businesses that users can find to support

# HOW TO CONTRIBUTE
Find an [issue](https://github.com/spicygreenbook/greenbook-app/issues) and comment that you are going to handle it so we don't get duplicate effort on the same issue. If you are unable to solve the issue, let us know in the comments so someone else can take it.

Join [our slack](https://spicy-green-book.slack.com) and let us know what you can do and we'll let you know how you can help!

# PULL REQUEST
If you clone this repo and realize you do not have permission to push directly to this repo [check out this article](https://jarv.is/notes/how-to-pull-request-fork-github/) to learn how to fork and make a pull request

## Want to report a bug or issue with the website?
Use the [issues](https://github.com/spicygreenbook/greenbook-app/issues) section on this page to let us know!

## How To Contribute Code
The app is built with [Expo](https://expo.io/) + [NextJS](https://nextjs.org/) and is hosted/deployed on [Vercel](https://www.vercel.com) (formerly now.sh)

## What do I need to know to contribute code?
**Absolutely Critical**: JavaScript

**Helps a lot**: Git/GitHub, Expo.io, React/React Native, NextJS, CSS, HTML, Understanding fetching JSON data from an API

## How to get started coding on this app
```sh
    # clone the repo
    git clone git@github.com:spicygreenbook/greenbook-app.git

    # change your directory into the greenbook repo
    cd greenbook-app

    # install node modules
    npm install

    # install expo
    npm install expo-cli --global

    # run expo.io
    expo start

    # run nextjs (for web)
    # this should make http://localhost:3000 available in your web browser
    npx next dev

```

## Workflow
  Use the expo.io app that opens on your localhost as well as an android and ios device to test everything you develop on both android and ios so that you do not get too far into development without properly supporting each device.

  Use your web browser and check both mobile and desktop sized views to ensure the responsive web app works on all device sizes.

  When necessary, is the isWeb flag to determine when to use web compatible components and methods or mobile device options.


## Slack
Our slack is at [spicy-green-book.slack.com](https://spicy-green-book.slack.com) if you want to be part of the community. We have a channel specifically for the coders to collaborate on.

