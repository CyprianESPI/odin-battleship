(()=>{"use strict";var e={28:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(81),i=n.n(r),s=n(645),o=n.n(s)()(i());o.push([e.id,":root {\n    /* https://m1.material.io/style/color.html#color-color-palette */\n    /* Blue */\n    --clr-primary-50: #E3F2FD;\n    --clr-primary-100: #BBDEFB;\n    --clr-primary-200: #90CAF9;\n    --clr-primary-300: #64B5F6;\n    --clr-primary-400: #42A5F5;\n    --clr-primary-500: #2196F3;\n    --clr-primary-600: #1E88E5;\n    --clr-primary-700: #1976D2;\n    --clr-primary-800: #1565C0;\n    --clr-primary-900: #0D47A1;\n\n    /* Red */\n    --clr-A100: #FF8A80;\n    --clr-A200: #FF5252;\n    --clr-A400: #FF1744;\n    --clr-A700: #D50000;\n\n    --br: 15px;\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n}\n\n/*border: 2px solid red;*/\n\nbody {\n    display: grid;\n    height: 100vh;\n    grid-template-rows: auto 1fr;\n    text-align: center;\n}\n\nheader {\n    display: flex;\n    justify-content: space-between;\n    padding: 10px 5% 10px 5%;\n    background-color: var(--clr-primary-300);\n}\n\nmain {\n    display: grid;\n    grid-auto-flow: column;\n}\n\n/* Responsive for mobile */\n@media only screen and (max-width: 1026px) {\n    main {\n        grid-auto-flow: row;\n    }\n\n    h1 {\n        font-size: medium;\n    }\n\n    h2 {\n        font-size: small;\n    }\n\n    .move-btn {\n        font-size: 15px;\n        width: 15px;\n    }\n}\n\nbutton {\n    border: none;\n}\n\n.rounded-btn {\n    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    width: 6rem;\n    height: 3rem;\n    border-radius: 3rem;\n    background-color: var(--clr-primary-900);\n    color: white;\n}\n\n.rounded-btn:hover {\n    background-color: var(--clr-A100);\n}\n\n.move-btn {\n    text-shadow: 0 0 5px #000;\n    border-radius: 50%;\n    aspect-ratio: 1;\n    width: 50px;\n    box-shadow: none;\n    background: none;\n    color: white;\n    font-size: 50px;\n}\n\n.enabled {\n    cursor: pointer;\n}\n\n.enabled:hover {\n    color: var(--clr-A100);\n}\n\n.disabled {\n    filter: brightness(0.50);\n}\n\n/* card like container */\n.player-container {\n    display: grid;\n    grid-template-rows: auto 1fr;\n    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n    margin: 10px 5% auto 5%;\n    border-radius: var(--br);\n}\n\n.board-container {\n    margin: 10px;\n    display: grid;\n    grid-template-rows: auto 1fr;\n    grid-template-columns: auto 1fr;\n    aspect-ratio: 1;\n}\n\n.numbers,\n.letters {\n    display: flex;\n    justify-content: space-around;\n}\n\n.letters {\n    flex-flow: column;\n}\n\n/* Overlay 2 grids on top of another */\n.board-stack {\n    display: grid;\n    grid-template-rows: 1fr;\n    grid-template-columns: 1fr;\n}\n\n/* set childs on same grid area to ensure they overlap */\n.board-stack>* {\n    grid-column: 1;\n    grid-row: 1;\n}\n\n.overlay {\n    display: grid;\n    grid-template-rows: 1fr;\n    grid-template-columns: 1fr;\n    pointer-events: none;\n}\n\n.overlay>* {\n    pointer-events: all;\n    position: relative;\n    grid-column: 1;\n    grid-row: 1;\n}\n\n.ship-overlay {\n    background-color: darkgray;\n    opacity: 0.5;\n    border-radius: 100px;\n}\n\n.board {\n    display: grid;\n    grid-template-rows: repeat(10, 1fr);\n    grid-template-columns: repeat(10, 1fr);\n    gap: 5px;\n    padding: 5px;\n}\n\n.cell {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.dot {\n    border-radius: 50%;\n    width: 33%;\n    height: 33%;\n}\n\n.clickable {\n    cursor: crosshair;\n}\n\n.clickable:hover {\n    filter: brightness(0.50);\n}\n\n.water,\n.ship {\n    background-color: var(--clr-primary-300);\n}\n\n.miss>* {\n    background-color: var(--clr-primary-900);\n}\n\n.hit>* {\n    background-color: var(--clr-A400);\n}\n\n#board-human>:first-child {\n    filter: brightness(0.666);\n}\n\n/* Hide computer's ships */\n#board-computer>:first-child>* {\n    background-color: var(--clr-primary-300);\n}\n\n/* Hide computer's ships overlay */\n#board-computer>:nth-child(2) {\n    display: none;\n}\n\n#oponent>h2 {\n    background-color: var(--clr-A700);\n    color: white;\n    border-radius: var(--br);\n    padding: 5px;\n}\n\n#you>h2 {\n    background-color: var(--clr-primary-900);\n    color: white;\n    border-radius: var(--br);\n    padding: 5px;\n}",""]);const a=o},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,i,s){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(r)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);r&&o[c[0]]||(void 0!==s&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=s),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),i&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=i):c[4]="".concat(i)),t.push(c))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var s={},o=[],a=0;a<e.length;a++){var l=e[a],d=r.base?l[0]+r.base:l[0],c=s[d]||0,h="".concat(d," ").concat(c);s[d]=c+1;var p=n(h),u={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)t[p].references++,t[p].updater(u);else{var m=i(u,r);r.byIndex=a,t.splice(a,0,{identifier:h,updater:m,references:1})}o.push(h)}return o}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var s=r(e=e||[],i=i||{});return function(e){e=e||[];for(var o=0;o<s.length;o++){var a=n(s[o]);t[a].references--}for(var l=r(e,i),d=0;d<s.length;d++){var c=n(s[d]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}s=l}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={id:r,exports:{}};return e[r](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{const e=class{static removeContent(e){if(null===e|void 0===e)console.error("Utils.removeContent, elem is",e);else for(;e.firstChild;)e.firstChild.remove()}static isEmpty(e){return 0===Object.keys(e).length}static removeIndexFromArray(e,t){t>-1&&e.splice(t,1)}static removeObjFromArray(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}};class t{static Direction={right:[0,1],left:[0,-1],up:[1,0],down:[-1,0]};static CellStatus={water:0,waterHit:1,ship:2,shipHit:3};constructor(e){this.ships=[],this.size=e,this.grid=[],this.enabled=!1;for(let n=0;n<e;n++){const n=[];for(let r=0;r<e;r++)n.push(t.CellStatus.water);this.grid.push(n)}}isMoveAllowed(e,n){if(e.isDamaged())return!1;const r=[];for(let t of e.shipCoordinates){const e=t[0]+n[0],i=t[1]+n[1];if(e<0||e>=this.size||i<0||i>=this.size)return!1;r.push([e,i])}const i=[];for(let e of r)i.push([e[0]+1,e[1]+1]),i.push([e[0]+1,e[1]+0]),i.push([e[0]+1,e[1]-1]),i.push([e[0]+0,e[1]+1]),i.push([e[0]+0,e[1]+0]),i.push([e[0]+0,e[1]-1]),i.push([e[0]-1,e[1]+1]),i.push([e[0]-1,e[1]+0]),i.push([e[0]-1,e[1]-1]);for(let n of i)if(!(n[0]<0||n[0]>=this.size||n[1]<0||n[1]>=this.size)){if(this.grid[n[0]][n[1]]===t.CellStatus.ship){if(e.shipCoordinates.find((e=>e[0]===n[0]&&e[1]===n[1])))continue;return!1}if(this.grid[n[0]][n[1]]===t.CellStatus.waterHit&&r.find((e=>this.grid[e[0]][e[1]]===t.CellStatus.waterHit)))return!1}return!0}moveShip(e,n){for(let r=0;r<e.shipCoordinates.length;r++)this.grid[e.shipCoordinates[r][0]][e.shipCoordinates[r][1]]=t.CellStatus.water,e.shipCoordinates[r][0]=e.shipCoordinates[r][0]+n[0],e.shipCoordinates[r][1]=e.shipCoordinates[r][1]+n[1];for(let n of e.shipCoordinates)this.grid[n[0]][n[1]]=t.CellStatus.ship}placeShip(e,n,r){const i=[];for(let s=0;s<e.length;s++){const e=n[1]+s*r[1],o=n[0]+s*r[0];if(e<0||e>=this.size||o<0||o>=this.size)return!1;if(this.grid[e][o]==t.CellStatus.ship)return!1;if(e+1<this.size&&this.grid[e+1][o]==t.CellStatus.ship||e-1>=0&&this.grid[e-1][o]==t.CellStatus.ship||o+1<this.size&&this.grid[e][o+1]==t.CellStatus.ship||o-1>=0&&this.grid[e][o-1]==t.CellStatus.ship)return!1;if(e+1<this.size&&o+1<this.size&&this.grid[e+1][o+1]==t.CellStatus.ship||e+1<this.size&&o-1>=0&&this.grid[e+1][o-1]==t.CellStatus.ship||e-1>=0&&o+1<this.size&&this.grid[e-1][o+1]==t.CellStatus.ship||e-1>=0&&o+1<this.size&&this.grid[e-1][o-1]==t.CellStatus.ship)return!1;i.push([e,o])}for(let e of i)this.grid[e[0]][e[1]]=t.CellStatus.ship;return e.shipCoordinates=i,this.ships.push(e),!0}receiveAttack(e){const n=e[0],r=e[1];for(let e of this.ships)for(let i of e.shipCoordinates)if(n==i[0]&&r==i[1])return e.hit(),this.grid[n][r]=t.CellStatus.shipHit,!0;return this.grid[n][r]=t.CellStatus.waterHit,!1}gameOver(){for(let e of this.ships)if(!e.isSunk())return!1;return!0}setEnabled(e){this.enabled=e}createMoveButton(e,n,r,i,s){const o=document.createElement("button");o.innerText="chevron_right";let a=[0,0];return e===t.Direction.right?(o.style.transform="rotate(0deg)",a=[0,1]):e===t.Direction.left?(o.style.transform="rotate(180deg)",a=[0,-1]):e===t.Direction.up?(o.style.transform="rotate(270deg)",a=[-1,0]):e===t.Direction.down&&(a=[1,0],o.style.transform="rotate(90deg)"),o.style.left=(n[0][1]+n[1][1])/2*10+5*a[1]+3+"%",o.style.top=(n[0][0]+n[1][0])/2*10+5*a[0]+3+"%",this.isMoveAllowed(s,a)?(o.className="material-symbols-outlined move-btn enabled",o.addEventListener("click",(e=>{this.moveShip(s,a),this.render(r,i)}))):o.className="material-symbols-outlined move-btn disabled",o}render(n,r){e.removeContent(n);const i=document.createElement("div");i.className="board";for(let e=0;e<this.size;e++)for(let n=0;n<this.size;n++){const s=document.createElement("div"),o=document.createElement("div");o.className="dot",this.grid[e][n]===t.CellStatus.water?(s.className="cell water",this.enabled&&(s.className+=" clickable",s.addEventListener("click",(t=>{console.log(`Firing at ${e}, ${n}`),r.play([e,n])})))):this.grid[e][n]===t.CellStatus.waterHit?(s.className="cell water miss",s.appendChild(o)):this.grid[e][n]===t.CellStatus.ship?(s.className="cell ship",this.enabled&&(s.className+=" clickable",s.addEventListener("click",(t=>{console.log(`Firing at ${e}, ${n}`),r.play([e,n])})))):this.grid[e][n]===t.CellStatus.shipHit&&(s.className="cell ship hit",s.appendChild(o)),i.appendChild(s)}n.appendChild(i);const s=document.createElement("div");s.className="overlay";for(let e of this.ships){const i=[e.shipCoordinates[0],e.shipCoordinates[e.shipCoordinates.length-1]],o=document.createElement("div");o.className="ship-overlay";const a=2;o.style.left=`${10*i[0][1]+a}%`,o.style.top=`${10*i[0][0]+a}%`,o.style.height=10*Math.abs(i[1][0]-i[0][0]+1)-2*a+"%",o.style.width=10*Math.abs(i[1][1]-i[0][1]+1)-2*a+"%",s.appendChild(o),s.appendChild(this.createMoveButton(t.Direction.left,i,n,r,e)),s.appendChild(this.createMoveButton(t.Direction.right,i,n,r,e)),s.appendChild(this.createMoveButton(t.Direction.up,i,n,r,e)),s.appendChild(this.createMoveButton(t.Direction.down,i,n,r,e))}n.appendChild(s)}}const r=t,i=class{constructor(e,t){this.length=e,this.name=void 0===t?"undefined":t,this.hits=0}hit(){this.hits++}isSunk(){return this.hits>=this.length}isDamaged(){return this.hits>0}};class s{static boardSize=10;constructor(e){this.name=e,this.board=new r(s.boardSize),this.ships=[new i(2,"corvette"),new i(3,"submarine"),new i(3,"destroyer"),new i(4,"cruiser"),new i(5,"aircraft")],this.plays=[],this.remainingPlays=[];for(let e=0;e<s.boardSize;e++)for(let t=0;t<s.boardSize;t++)this.remainingPlays.push([e,t]);for(var t=this.remainingPlays.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),o=this.remainingPlays[t];this.remainingPlays[t]=this.remainingPlays[n],this.remainingPlays[n]=o}}play(t,n){return this.plays.push(n),e.removeObjFromArray(this.remainingPlays,n),t.board.receiveAttack(n)}playRandom(e){const t=this.remainingPlays.pop();return this.play(e,t)}shuffleShips(){const e=[[1,0],[0,1]];for(let t of this.ships){let n=Math.floor(Math.random()*(s.boardSize-1)),r=Math.floor(Math.random()*(s.boardSize-1)),i=Math.random()>=.5?e[0]:e[1];for(;!this.board.placeShip(t,[n,r],i);)n=Math.floor(Math.random()*(s.boardSize-1)),r=Math.floor(Math.random()*(s.boardSize-1)),i=Math.random()>=.5?e[0]:e[1]}console.log(this.board.ships)}}const o=s,a=class{constructor(e,t){this.humanBoard=e,this.computerBoard=t,this.newGame()}newGame(){this.human=new o("You"),this.computer=new o("CPU"),this.players=[this.human,this.computer];for(let e of this.players)e.shuffleShips();this.computer.board.setEnabled(!0),this.render()}play(e){this.human.play(this.computer,e),this.computer.playRandom(this.human),this.render(),this.computer.board.gameOver()?(alert("You win!\nPlay again?"),this.newGame()):this.human.board.gameOver()&&(alert("You lose...\nPlay again?"),this.newGame())}render(){this.human.board.render(this.humanBoard,this),this.computer.board.render(this.computerBoard,this)}};var l=n(379),d=n.n(l),c=n(795),h=n.n(c),p=n(569),u=n.n(p),m=n(565),f=n.n(m),g=n(216),v=n.n(g),y=n(589),b=n.n(y),w=n(28),C={};C.styleTagTransform=b(),C.setAttributes=f(),C.insert=u().bind(null,"head"),C.domAPI=h(),C.insertStyleElement=v(),d()(w.Z,C),w.Z&&w.Z.locals&&w.Z.locals,function(){console.log("Initializing...");const e=new URLSearchParams(document.location.search);console.log(e);const t=document.getElementById("board-human"),n=document.getElementById("board-computer"),r=new a(t,n);document.getElementById("restart").addEventListener("click",(e=>{r.newGame()})),console.log("Initialized!")}()})()})();