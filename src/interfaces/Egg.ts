export default function Egg(x_pos, y_pos, color) {
  this.x_pos = x_pos;
  this.y_pos = y_pos;
  this.color = color;
  this.x_dir = 0;
  this.y_dir = 0;
  this.speed = 0;
  this.initspeed = 0;
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