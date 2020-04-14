describe("Player", function() {
  var player;
  var balls;
  var trees;

  beforeEach(function() {
    player = new Player();
    rollate = new Rollate();
    trees = new Trees();
    resetKeyStatus();
  });

  describe('when the user moves to', function(){
    it("right should move to the right", function() {
      var expectedPosition = player.x + player.speedX;
      keydown.right = true;
      player.update();
      expect(player.x).toEqual(expectedPosition);
    });

    it("left should move to the left", function() {
      var expectedPosition = player.x - player.speedX;
      keydown.left = true;
      player.update();
      expect(player.x).toEqual(expectedPosition);
    });

    it("up should move up", function() {
      var expectedPosition = player.y - player.speedY;
      keydown.up = true;
      player.update();
      expect(player.y).toEqual(expectedPosition);
    });

    it("down should move down", function() {
      var expectedPosition = player.y + player.speedY;
      keydown.down = true;
      player.update();
      expect(player.y).toEqual(expectedPosition);
    });
  });

  describe('when the user shoots', function(){
    it("it creates a new snowball", function() {
      player.shoot();
      expect(player.balls.list.length).toEqual(1);
    });
  });
});
