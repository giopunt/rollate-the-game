var Player = function(){
  this.width = 60;
  this.scale = 0.714285714;
  this.height = this.width / this.scale;
  this.pauseMove = false;
  this.x = (window.innerWidth  / 2) - (this.width / 2);
  this.y = (window.innerHeight / 2) - (this.height / 2);
  this.speed = this.height / 3;
  this.trueImg = document.getElementById('player-1');
  this.emptyImg = document.createElement('img');
  this.img = this.trueImg;

  this.balls = new Balls(this);
}

Player.prototype.update = function(){
  if(!this.pauseMove && !game.over){
    var x = this.x,y = this.y;
    if (keydown.space) {
      this.shoot();
    }

    if(keydown.left){
        x = this.x - this.speed;
    }
    if(keydown.up){
        y = this.y - this.speed;
    }
    if(keydown.right){
        x = this.x + this.speed;
    }
    if(keydown.down){
        y = this.y + this.speed;
    }

    if(this.canMove(x, y)){
      this.x = x;
      this.y = y;
    }

    this.x = this.x.clamp(0, game.canvas.element.width - this.width);
    this.y = this.y.clamp(0, game.canvas.element.height - this.height);
    if(collides(this, rollate)){
      game.end();
    }
    this.pauseMove = true;

    setTimeout((function(){
      this.pauseMove = false;
    }).bind(this),100);
  }
}

Player.prototype.canMove = function(x, y){
  return this.checkCollide(x, y);
};

Player.prototype.draw = function(){
  game.canvas.canvas.drawImage(this.img, this.x, this.y, this.width, this.height);
  this.balls.update();
}

Player.prototype.shoot = function(){
  if(!game.over){
    this.balls.throw();
  }
}

Player.prototype.blink = function(){
  setTimeout((function(){
    this.img = this.emptyImg;
  }).bind(this), 0);
  setTimeout((function(){
    this.img = this.trueImg;
  }).bind(this), 600);
  setTimeout((function(){
    this.img = this.img = this.emptyImg;
  }).bind(this), 1200);
  setTimeout((function(){
    this.img = this.trueImg;
  }).bind(this), 1800);
  setTimeout((function(){
    this.img = this.img = this.emptyImg;
  }).bind(this), 2400);
  setTimeout((function(){
    this.img = this.trueImg;
  }).bind(this), 3200);
}

Player.prototype.checkCollide = function(x, y){
  var futurePlayer = {
    x: x,
    y: y,
    width: this.width,
    height: this.height
  };
  var result = true;
  for(var j = 0; j < trees.list.length; j++){
    var futureTree = {
      x: trees.list[j].x + (trees.list[j].width / 4),
      y: trees.list[j].y + (trees.list[j].height / 2),
      width: trees.list[j].width / 2,
      height: trees.list[j].height / 2
    };
    if( collides(futurePlayer, futureTree) ){
      result = false;
    }
  }
  return result;
}
