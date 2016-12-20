var TREE_WIDTH = 120;
var TREE_HEIGHT = TREE_WIDTH * 0.923076923;

var tree = {
  x: 0,
  y: 0,
  width: TREE_WIDTH,
  height: TREE_HEIGHT,
  draw: function() {
    var img = document.getElementById('tree-1');
    canvas.drawImage(img, this.x, this.y, this.width, this.height );
  }
};
