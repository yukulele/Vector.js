var Vector = (function() {
  function Vector() {
    var coord = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      coord[_i - 0] = arguments[_i];
    }
    if (!(this instanceof Vector))
      return new(Vector.bind.apply(Vector, [void 0].concat(coord)))();
    this.coord = coord;
    while (coord.length > 0 && coord[coord.length - 1] == 0)
      coord.pop();
  }
  try {
    Vector.prototype[Symbol.iterator] = function() {
      return this.coord[Symbol.iterator]();
    };
  } catch (e) {};
  Vector.polar = function(r) {
    if (r === void 0) {
      r = 0;
    }
    var ang = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      ang[_i - 1] = arguments[_i];
    }
    var coord = [];
    var cos = r;
    for (var i = ang.length - 1; i >= 0; i--) {
      coord.unshift(cos * Math.sin(ang[i]));
      cos *= Math.cos(ang[i]);
    }
    coord.unshift(cos);
    return new(Vector.bind.apply(Vector, [void 0].concat(coord)))();
  };
  Vector.prototype.polar = function() {
    var ret = [];
    var a = null;
    var first = true;
    var y;
    for (var x = void 0, i = 1; i < this.coord.length; i++) {
      x = this.coord[i - 1];
      y = this.coord[i];
      if (a === null) {
        ret.push(Math.atan2(y, x));
        a = x * x;
      } else {
        ret.push(Math.atan2(y, Math.sqrt(a)));
      }
      a += y * y;
    }
    ret.unshift(Math.sqrt(a));
    return ret;
  };
  Vector.prototype.add = function() {
    var vect = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      vect[_i - 0] = arguments[_i];
    }
    vect.push(this);
    var coord = [];
    var len = Math.max.apply(Math, vect.map(function(v) {
      return v.coord.length;
    }));
    for (var i = 0; i < len; i++)
      coord[i] = vect.map(function(v) {
        return v.coord[i] || 0;
      }).reduce(function(a, b) {
        return a + b;
      });
    return new(Vector.bind.apply(Vector, [void 0].concat(coord)))();
  };
  Vector.prototype.sub = function(v2) {
    return this.add(v2.inv());
  };
  Vector.prototype.mul = function(a) {
    return new(Vector.bind.apply(Vector, [void 0].concat(this.coord.map(function(c) {
      return c * a;
    }))))();
  };
  Vector.prototype.div = function(a) {
    return this.mul(1 / a);
  };
  Vector.prototype.inv = function() {
    return this.mul(-1);
  };
  Vector.prototype.mix = function(v, a) {
    return this.mul(1 - a).add(v.mul(a));
  };
  Vector.prototype.len = function(a) {
    if (a === void 0)
      return Math.hypot.apply(Math, this.coord);
    return this.mul(a / this.len());
  };
  Vector.prototype.norm = function() {
    return this.len(1);
  };
  Vector.prototype.dist = function(v) {
    return this.sub(v).len();
  };
  Vector.prototype.dot = function() {
    var vect = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      vect[_i - 0] = arguments[_i];
    }
    vect.push(this);
    var coord = [];
    var len = Math.max.apply(Math, vect.map(function(v) {
      return v.coord.length;
    }));
    for (var i = 0; i < len; i++)
      coord[i] = vect.map(function(v) {
        return v.coord[i] || 0;
      }).reduce(function(a, b) {
        return a * b;
      });
    return coord.reduce(function(a, b) {
      return a + b;
    });
  };
  Vector.prototype.volume = function() {
    return this.coord.reduce(function(a, b) {
      return a * a;
    });
  };
  return Vector;
})();
//# sourceMappingURL=vector.js.map
