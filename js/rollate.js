var ROLLATE_WIDTH = 120;
var ROLLATE_HEIGHT = ROLLATE_WIDTH * 1.04347826087;

var rollate = {
  x: 0,
  y: 500,
  width: ROLLATE_WIDTH,
  height: ROLLATE_HEIGHT,
  velocity: 30,
  count: 0,
  shot: false,
  active: true,
  direction: 'up',
  update: function() {
    var dXY = rollate.height / 2;
    var futurePostion1 = rollate.y - dXY;
    var futurePostion2 = rollate.y + dXY;
    if(this.count > 5 && this.count % this.velocity === 0){
        if(this.direction == 'up' && this.checkCollide(this.x, futurePostion1)){
          this.direction = 'up';
          rollate.y -= dXY;
        }else if(this.checkCollide(this.x, futurePostion2)){
          this.direction = 'down';
          rollate.y += dXY;
        }
    }
    this.count++;
    rollate.y = rollate.y.clamp(0, CANVAS_HEIGHT - rollate.height);
    if(rollate.y == CANVAS_HEIGHT - rollate.height){
      this.direction = 'up';
    }
  },
  destroy: function(){
    this.active = false;
  },
  draw: function() {
    if(this.active){
      var img = document.getElementById('rollate-1');
      canvas.drawImage(img, this.x, this.y, this.width, this.height );
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
