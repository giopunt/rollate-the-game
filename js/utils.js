Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}
