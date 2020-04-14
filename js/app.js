var player = new Player();
var trees = new Trees();

var Game = function(){
  this.canvas = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  this.over = true;

  this.canvas.element = document.createElement('canvas');
  this.canvas.element.id = 'board-game';
  this.canvas.element.setAttribute('width', this.canvas.width);
  this.canvas.element.setAttribute('height', this.canvas.height);
  this.canvas.element.style.display = 'none';
  this.canvas.canvas = this.canvas.element.getContext("2d");
  this.intro = document.getElementById('intro');
  document.body.appendChild(this.canvas.element);
  this.repeat;
};

Game.prototype.start = function(){
  player = new Player();
  trees = new Trees();
  this.intro.style.display = 'none';
  this.canvas.element.style.display = 'block';
  this.canvas.canvas.clearRect(0, 0, game.canvas.width, game.canvas.height);

  function update(){
   player.update();
   rollate.update();
  }

  function draw(){
    game.canvas.canvas.clearRect(0, 0, game.canvas.width, game.canvas.height);
    rollate.draw();
    player.draw();
    trees.draw();
  }

  var FPS = 30;
  this.repeat = setInterval(function() {
    update();
    draw();
  }, 1000/FPS);
  setTimeout(function(){
    game.over = false;
    bindKeyEvents();
  }, 300);
};

Game.prototype.end = function(){
  this.over = true;
  player.blink();
  setTimeout(function(){
    clearInterval(game.repeat);
    game.intro.style.display = 'block';
    game.canvas.element.style.display = 'none';
  }, 3300);
};
var game = new Game();
