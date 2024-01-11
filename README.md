# Odin Battleship

https://CyprianESPI.github.io/odin-battleship/

## TODO

### Bugfixes

- Align ship overlay for mobile
- Fix UT & add to watch command

### Features

- new logo icon
- Add online multiplayer
- Improve performance with CLS (replace only children that changed in game board) | 74 now in lighthouse (mobile)

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

### Personal Challenge

Code without using Google.

Failed:

- Used StackOverflow for shuffling an array, for screen shake
- Used GoogleFonts for icons
- PWA from https://github.com/CarsonSlovoka/twenty48/tree/gh-pages/docs