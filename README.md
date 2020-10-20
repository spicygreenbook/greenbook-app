# greenbook-app
Code base for the android, ios, and responseive web apps for [spicygreenbook.com](https://spicygreenbook.com) which is a directory of local black-owned businesses that users can find to support

# WE NEED YOUR HELP!
- Fix/implement the navigation stack handler for ios/android. We are not using any native navigation functions
- Implement a webview for the forms on the add listing, contact us, and stripe donation forms to work on mobile apps
- Enhance the image gallery for listings. It works, however, we want it to be AWESOME
- Look at [our design](https://www.figma.com/file/7FrZMsARS2MdTWsG7SjCnN/SGB?node-id=238%3A393) and use it to fix any design issues and/or implement missing areas
- Join [our slack](https://spicy-green-book.slack.com) and let us know what you can do and we'll let you know how you can help!

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

## What should I work on?
  We have [a design here](https://www.figma.com/file/7FrZMsARS2MdTWsG7SjCnN/SGB?node-id=238%3A393) that you can review to determine what to work on. Please reach out to [Dan](https://github.com/pleaseshutup) pleaseshutup at gmail.com to let him know what you intend to work on. I (dan) intend to build the whole thing as time allows if nobody else comes along to help, however, I would appreciate any help I can get.

## Slack
Our slack is at [spicy-green-book.slack.com](https://spicy-green-book.slack.com) if you want to be part of the community. We have a channel specifically for the coders to collaborate on.

