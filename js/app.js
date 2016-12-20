var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;

var canvasElement = document.createElement('canvas');
canvasElement.setAttribute('width', CANVAS_WIDTH);
canvasElement.setAttribute('height', CANVAS_HEIGHT);
var canvas = canvasElement.getContext("2d");
document.body.appendChild(canvasElement);

function update(){
 player.update();
 rollate.update();
}

function draw(){
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  rollate.draw();
  player.draw();
  tree.draw();
}

var FPS = 30;
setInterval(function() {
  update();
  draw();
}, 1000/FPS);
