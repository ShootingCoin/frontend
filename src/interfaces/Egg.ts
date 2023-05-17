export default function Egg({
  idx,
  x_pos,
  y_pos,
  color,
  x_dir = 0,
  y_dir = 0,
  speed = 0,
  mass,
  friction = 0.1,
  account,
  isOut = false,
}) {
  this.idx = idx;
  this.x_pos = x_pos;
  this.y_pos = y_pos;
  this.color = color;
  this.x_dir = x_dir;
  this.y_dir = y_dir;
  this.speed = speed;
  this.mass = mass;
  this.friction = friction;
  this.account = account;
  this.isOut = isOut;
}

// push using addForce
//egg_array[0].addForce(Math.cos(1), Math.sin(1), 40);
Egg.prototype.addForce = function(x_dir, y_dir, force) {
  this.x_dir = x_dir;
  this.y_dir = y_dir;
  this.speed = Math.sqrt(2 * force);
  return true;
};

Egg.prototype.HitTest = function(cx, cy, radius) {
  return ((cx > this.x_pos - radius) && (cx < this.x_pos + radius)
      && (cy > this.y_pos - radius) && (cy < this.y_pos + radius));
}