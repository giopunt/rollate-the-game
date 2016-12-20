var PLAYER_WIDTH = 60;
var PLAYER_HEIGHT = PLAYER_WIDTH / 0.714285714;

var player = {
  width: PLAYER_WIDTH,
  height: PLAYER_HEIGHT,
  x: (window.innerWidth  / 2) - (PLAYER_WIDTH  / 2),
  y: (window.innerHeight / 2) - (PLAYER_HEIGHT / 2),
  canMove: false,
  shoots: {
    list: [],
    stop: false,
    width: PLAYER_WIDTH * 0.25,
    height: PLAYER_WIDTH * 0.25,
    src: 'images/snowball-1.png'
  },
  draw: function() {
    var img = document.getElementById('player-1');
    canvas.drawImage(img, this.x, this.y, this.width, this.height );

    for(var i = 0; i < this.shoots.list.length; i++){
      if(this.shoots.list[i].active){
        var img2 = document.getElementById('snowball-1');
        var x,y, dXY = 7;

        switch (this.shoots.list[i].direction) {
          case 'left':
            x = this.shoots.list[i].x - dXY;
            y = this.shoots.list[i].y;
            break;
          case 'down':
            x = this.shoots.list[i].x;
            y = this.shoots.list[i].y + dXY;
            break;
          case 'right':
            x = this.shoots.list[i].x + dXY;
            y = this.shoots.list[i].y;
            break;
          default:
            x = this.shoots.list[i].x;
            y = this.shoots.list[i].y - dXY;
        }

        canvas.drawImage(img2, x, y, this.shoots.width, this.shoots.height);

        this.shoots.list[i].x = x;
        this.shoots.list[i].y = y;
        this.shoots.list[i].count++;
        if(collides(this.shoots.list[i], rollate)){
          rollate.destroy();
          this.shoots.list[i].active = false;
        }
        if(this.shoots.list[i].count > 80){
          this.shoots.list[i].active = false;
        }
      }
    }
  },
  shoot: function(x,y){
    if(!this.shoots.stop){
      var img = document.getElementById('snowball-1');
      var dY = keydown.direction == 'down' ? this.height : keydown.direction == 'up' ?
                -(this.shoots.width  / 2) : (this.height / 2 - (this.shoots.height  / 2));
      var dX = keydown.direction == 'up' || keydown.direction == 'down' ?
                (this.width / 2 - (this.shoots.width  / 2)) : keydown.direction == 'right' ?
                this.width : - (this.shoots.width  / 2);
      var x = this.x + dX;
      var y = this.y + dY;

      canvas.drawImage(img, x, y, this.shoots.width, this.shoots.height);

      this.shoots.list.push({x: x,y: y, direction: keydown.direction, count: 0, active: true, width: this.shoots.width, height: this.shoots.height});
      this.shoots.stop = true;

      setTimeout((function(){
        this.shoots.stop = false;
      }).bind(this),100);
    }
  },
  update: function(){
    if(!this.canMove){
      if (keydown.space) {
        player.shoot();
      }
      var dX = this.width / 2;
      var dY = this.height / 2;
      if(keydown.left){
        var nextPosition = this.x - dX;
        if(this.checkCollide(nextPosition, this.y)){
          this.x = nextPosition;
        }
      }
      if(keydown.right){
        var nextPosition = this.x + dX;
        if(this.checkCollide(nextPosition, this.y)){
          this.x = nextPosition;
        }
      }

      if(keydown.up){
        var nextPosition = this.y - dY;
        if(this.checkCollide(this.x, nextPosition)){
          this.y = nextPosition;
        }
      }
      if(keydown.down){
        var nextPosition = this.y + dY;
        if(this.checkCollide(this.x, nextPosition)){
          this.y = nextPosition;
        }
      }

      player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
      player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);
      this.canMove = true;

      setTimeout((function(){
        this.canMove = false;
      }).bind(this),100);
    }
  },
  checkCollide: function(x, y){
    return !collides({
      x: x,
      y: y,
      width: this.width / 2,
      height: this.height / 2
    }, tree);
  }
};
