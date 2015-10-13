var vector = {
  _x: 1,
  _y: 0,

  create: function(x, y) {
    var obj = Object.create(this);
    obj.setX(x);
    obj.setY(y);
    return obj;
  },

  setX: function(value) {
    this._x = value;
  },

  getX: function() {
    return this._x;
  },

  setY: function(value) {
    this._y = value;
  },

  getY: function() {
    return this._y;
  },

  setLength: function(length) {
    var angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },

  getLength: function() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  },

  setAngle: function(angle) {
    var length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },

  getAngle: function() {
    return Math.atan2(this._y, this._x);
  },

  add: function(vector2) {
    return vector.create(this._x + vector2.getX(), this._y + vector2.getY());
  },

  substract: function(vector2) {
    return vector.create(this._x - vector2.getX(), this._y - vector2.gety());
  },

  scale: function(value) {
    return vector.create(this._x * value, this._y * value);
  },

  divide: function(value) {
    return vector.create(this._x / value, this._y / value);
  }
};
