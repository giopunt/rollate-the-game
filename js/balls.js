var Balls = function(player){
  this.list = [];
  this.player = player;
  this.stop = false;
  this.width = this.player.width * 0.25;
  this.height = this.player.width * 0.25;
  this.speed = 7;
};

Balls.prototype.throw = function(){
  if(!this.stop){
    var img = document.getElementById('snowball-1');
    var dY = keydown.direction == 'down' ? this.player.height : keydown.direction == 'up' ?
              -(this.width  / 2) : (this.player.height / 2 - (this.height  / 2));
    var dX = keydown.direction == 'up' || keydown.direction == 'down' ?
              (this.player.width / 2 - (this.width  / 2)) : keydown.direction == 'right' ?
              this.player.width : - (this.width  / 2);
    var x = this.player.x + dX;
    var y = this.player.y + dY;

    game.canvas.canvas.drawImage(img, x, y, this.width, this.height);
    this.list.push({
      x: x,
      y: y,
      direction: keydown.direction,
      count: 0,
      active: true,
      width: this.width,
      height: this.height
    });
    this.stop = true;

    setTimeout((function(){
      this.stop = false;
    }).bind(this),100);
  }
};

Balls.prototype.update = function(){
  var img = document.getElementById('snowball-1');
  for(var i = 0; i < this.list.length; i++){
    if(this.list[i].active){
      var x,y, dXY = this.speed;

      switch (this.list[i].direction) {
        case 'left':
          x = this.list[i].x - dXY;
          y = this.list[i].y;
          break;
        case 'down':
          x = this.list[i].x;
          y = this.list[i].y + dXY;
          break;
        case 'right':
          x = this.list[i].x + dXY;
          y = this.list[i].y;
          break;
        default:
          x = this.list[i].x;
          y = this.list[i].y - dXY;
      }

      game.canvas.canvas.drawImage(img, x, y, this.width, this.height);

      this.list[i].x = x;
      this.list[i].y = y;
      this.list[i].count++;
      if(collides(this.list[i], rollate)){
        rollate.destroy();
        this.list[i].active = false;
      }
      for(var j = 0; j < trees.list.length; j++){
        if( collides(this.list[i], trees.list[j]) ){
          this.list[i].active = false;
        }
      }
      if(this.list[i].count > 80){
        this.list[i].active = false;
      }
    }
  }
};


Balls.prototype.explode = function(){

};
