let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("onkeypress", (e) => {
  console.log(e);
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  } else if (event.keyCode == 38) {
    keyboard.UP = true;
  } else if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  } else if (event.keyCode == 40) {
    keyboard.DOWN = true;
  } else if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  console.log(keyboard);
});


window.addEventListener("keyup", (event) => {
    if (event.keyCode == 37) {
      keyboard.LEFT = false;
    } else if (event.keyCode == 38) {
      keyboard.UP = false;
    } else if (event.keyCode == 39) {
      keyboard.RIGHT = false;
    } else if (event.keyCode == 40) {
      keyboard.DOWN = false;
    } else if (event.keyCode == 32) {
      keyboard.SPACE = false;
    }
    console.log(keyboard);
  });