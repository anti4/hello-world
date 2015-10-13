var particle = {
  position: null,
  velocity: null,
  acceleration: null,
  _attraction: null,
  radius: 5,

  create: function(x, y, speed, direction, attraction, target) {
    var obj = Object.create(this);
    obj.position = vector.create(x, y);
    obj.velocity = vector.create(0, 0);
    obj.velocity.setLength(speed);
    obj.velocity.setAngle(direction);
    obj.acceleration = vector.create(0, 0);
    obj.acceleration.setLength(attraction);
    obj.acceleration.setAngle(target);
    obj._attraction = attraction;
    return obj;
  },

  update: function() {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);
  },

  draw: function(context) {
    context.beginPath();
    context.arc(this.position.getX(), this.position.getY(), this.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(this.position.getX(), this.position.getY());
    context.lineTo(this.position.getX() + this.velocity.getX() * 4, this.position.getY() + this.velocity.getY() * 4);
    context.stroke();

    context.beginPath();
    context.strokeStyle = "blue";
    context.moveTo(this.position.getX(), this.position.getY());
    context.lineTo(this.position.getX() + this.acceleration.getX() * 40, this.position.getY() + this.acceleration.getY() * 40);
    context.stroke();
  },

  setTargetAttraction: function(angle, value) {
    this.acceleration.setLength(this._attraction * value);
    this.acceleration.setAngle(angle);
  }
};
