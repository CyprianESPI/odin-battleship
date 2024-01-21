# Odin Battleship

[Javascript exercise for The Odin Project curriculum](https://www.theodinproject.com/lessons/node-path-javascript-battleship)

This version of the famous Battleship game supports:
- Player versus Computer
- Player versus Player (switch player on the same device)

Play it now at:

https://CyprianESPI.github.io/odin-battleship/

## TODO

### Bugfixes

- Align ship overlay for mobile

### Features

- Add new logo icon
- Add online multiplayer
- Improve performance with CLS (replace only children that changed in game board) | 74 now in lighthouse (mobile)
- Improve AI

## Webpack for web

### Install

First make sure Node Version Manager is installed on your system.

https://github.com/nvm-sh/nvm

Once NVM is installed, you can use Node Package Manager to complete the installation and run other commands.

`npm i` or `npm install` (they are the same)

### Build

`npm run build`

### Test

`jest`

### Run locally

`npm run watch`

### Deploy

`npm run deploy`

Website is live at https://CyprianESPI.github.io/odin-battleship/

#### Fix deploy in case of rebase

`git push origin git subtree split --prefix 'dist' main:gh-pages --force`

Another way to fix it it to remove other gh-pages branches from the Github webpage interface

---

**NOTE**

`npm run ...` commands are described in the `package.json` file, under the `scripts` tag.

---

## Learning Outcomes

### Test Driven Development

TDD with Jest made it easy to implement the base class and ensure their functionality.

However, to keep TDD relevant, it should be added to the deploy pipeline.

Due to this mistake, adding the DOM logic inside the already tested classes broke the unit tests. To fix it, the code had to be refactored which is can be quite a task depending on the project's size.

### Progressive Web Application

Learned how to use a webmanifest to allow downloading the webpage as an app.

### Performance

It can be greatly affected by overusing css properties such as backdrop-filter

## External resources used

- Glassomorphism from https://css.glass/
- Used StackOverflow for shuffling an array, for screen shake
- Used GoogleFonts for icons
- PWA from https://github.com/CarsonSlovoka/twenty48/tree/gh-pages/docs
- Background image from Unspash https://unsplash.com/photos/body-of-water-during-daytime-hRemch0ZDwI