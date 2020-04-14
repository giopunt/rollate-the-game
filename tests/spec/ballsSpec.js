describe("Snow Balls", function() {
  var player;
  var song;
  var balls;
  var trees;

  beforeEach(function() {
    keydown.direction = 'left';
    var player = {width: 50, height: 50, x: 0, y: 0};
    balls = new Balls(player);
    trees = new Trees();
  });

  it("can be created", function() {
    balls.throw();
    expect(balls.list.length).toBe(1);
  });

  it("the ball direction is the same as the user input", function() {
    balls.throw();
    var expectedPosition = balls.list[0].x - balls.speed;
    expect(balls.list[0].direction).toBe('left');
    balls.update();
    expect(balls.list[0].x).toBe(expectedPosition);
  });

  it("on update the ball direction move in the given direction", function() {
    balls.throw();
    var expectedPosition = balls.list[0].x - balls.speed;
    balls.update();
    expect(balls.list[0].x).toBe(expectedPosition);
  });

  it("after less than 80 updates the ball is inactive", function() {
    balls.throw();
    var expectedPosition = balls.list[0].x - balls.speed;
    for(var i = 0; i < 80; i++){
        balls.update();
    }
    expect(balls.list[0].active).toBe(true);
  });

  it("after more than 80 updates the ball is inactive", function() {
    balls.throw();
    var expectedPosition = balls.list[0].x - balls.speed;
    for(var i = 0; i <= 80; i++){
        balls.update();
    }
    expect(balls.list[0].active).toBe(false);
  });
});
