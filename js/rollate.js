var ROLLATE_WIDTH = 120;
var ROLLATE_HEIGHT = ROLLATE_WIDTH * 1.04347826087;

var rollate = {
  x: 10,
  y: 500,
  width: ROLLATE_WIDTH,
  height: ROLLATE_HEIGHT,
  velocity: 30,
  count: 0,
  shot: false,
  active: true,
  direction: 'up',
  stepCount: 0,
  update: function() {
    if(this.count > 5 && this.count % this.velocity === 0){
        var nextPosition = this.getFuturePosition();
        this.x = nextPosition.x;
        this.y = nextPosition.y;
        this.stepCount++;
    }
    this.count++;
    this.y = this.y.clamp(0, game.canvas.element.height - this.height);
    this.x = this.x.clamp(0, game.canvas.element.width - this.width);
    if(this.stepCount % 3 == 0){
      //this.invertDirection();
    }
  },
  getFuturePosition: function() {
    var futurePostion = { x: this.x, y: this.y };
    var dX = this.width / 3;
    var dY = this.height / 3;

    if(this.direction == 'up' && !this.checkCollide(futurePostion.x, futurePostion.y - dY)){
      this.direction = 'up';
      return { x: futurePostion.x, y: futurePostion.y - dY };
    } else {
        this.direction = 'right';
    }

    if(this.direction == 'right' && !this.checkCollide(futurePostion.x + dX, futurePostion.y)){
      this.direction = 'right';
      return { x: futurePostion.x + dX, y: futurePostion.y  };
    } else {
      this.direction = 'left';
    }

    if(this.direction == 'left' && !this.checkCollide(futurePostion.x - dX, futurePostion.y)){
      this.direction = 'left';
      return { x: futurePostion.x - dX, y: futurePostion.y };
    } else {
      this.direction = 'down';
    }

    if(this.direction == 'down' && !this.checkCollide(futurePostion.x, futurePostion.y + dY)){
      this.direction = 'down';
      return { x: futurePostion.x, y: futurePostion.y + dY };
    }
    return futurePostion;
  },
  invertDirection: function() {
    if(this.direction == 'up'){
      this.direction = 'right';
    } else if(this.direction == 'right'){
      this.direction = 'up';
    } else if(this.direction == 'left'){
      this.direction = 'down';
    } else if(this.direction == 'down'){
      this.direction = 'right';
    }
  },
  destroy: function(){
    this.active = false;
  },
  draw: function() {
    if(this.active){
      var img = document.getElementById('rollate-1');
      game.canvas.canvas.drawImage(img, this.x, this.y, this.width, this.height );
    }
  },
  checkCollide: function(x, y){
    var futureRollate = {
      x: x,
      y: y,
      width: this.width,
      height: this.height
    };
    var result = false;
    for(var j = 0; j < trees.list.length; j++){
      if( collides(futureRollate, trees.list[j]) ){
        result = true;
      }
    }
    if(futureRollate.y > game.canvas.element.height - this.height){
      result = true;
    }
    if(futureRollate.x > game.canvas.element.width - this.width){
      result = true;
    }
    if(futureRollate.y < 0){
      result = true;
    }
    if(futureRollate.x < 0){
      result = true;
    }
    return result;
  }
};

var Rollate = function(){

}
