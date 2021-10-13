const EventEmitter = require("events");

class Player extends EventEmitter {}

var player = new Player();

// player.once('play', (track) => {
//   console.log(`正在播放:《${track}》`)
// })

player.on(
  "play", 
  (track) => console.log(`正在播放:《${track}》`)
);

player.emit("play", "精绝古城");
player.emit("play", "黄皮子坟");
