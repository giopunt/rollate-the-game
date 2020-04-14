var Trees = function(){
  this.list = [];
  this.scale = 0.923076923;
  this.width = 120;
  this.height = this.width * this.scale;
  this.x = 0;
  this.y = 0;
  this.firstLoad = true;
};

Trees.prototype.draw = function(){
  if(this.firstLoad){
    this.fillList();
    this.firstLoad = false;
  }
  for(var i = 0; i < this.list.length; i++){
    var img = document.getElementById('tree-' + 1);
    game.canvas.canvas.drawImage( img, this.list[i].x, this.list[i].y, this.width, this.height);
  }
};

Trees.prototype.fillList = function(){
  var treesNumber =  Math.floor((game.canvas.element.width / game.canvas.element.height * 10) + 1) - 2;
  for(var i = 0; i < treesNumber; i++){
    var x = Math.floor((Math.random() * game.canvas.element.width - this.width) + 1);
    var y = Math.floor((Math.random() * game.canvas.element.height - this.height) + 1);
    var tree = { x: x, y: y, width: this.width, height: this.height };
    if(!collides(tree, player) && !collides(tree, rollate)){
        this.list.push(tree);
    }
  }
};
