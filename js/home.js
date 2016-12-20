var HOME_WIDTH = 120;
var HOME_HEIGHT = HOME_WIDTH / 1.57894737;

var house = {
  x: 0,
  y: 0,
  width: HOME_WIDTH,
  height: HOME_HEIGHT,
  draw: function() {
    var img = document.getElementById('house-1');
    canvas.drawImage(img, this.x, this.y, this.width, this.height );
  }
};
