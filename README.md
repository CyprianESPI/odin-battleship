# Odin Battleship

https://CyprianESPI.github.io/odin-battleship/

## TODO

### Bugfixes

- TBD

### Features

- Improve AI to target adjacent to shipHit
- Add 2 human player switch play option
- Add online multiplayer
- Add visit stats database
- Add username
- Add screen/device shake
- Show adj cells which don't need to be hit anymore

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

- Used StackOverflow for shuffling an array
- Used GoogleFonts for icons