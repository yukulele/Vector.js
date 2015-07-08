class Vector {
  coord: Array<number>;
  constructor(...coord) {
    this.coord = coord;
    while (coord.length > 0 && coord[coord.length - 1] == 0)
      coord.pop();
  }
  static polar(r: number = 0, ...ang: Array<number>): Vector {
    let coord: Array < number > = [];
    let sin = r;
    let i;
    for (i = 0; i < ang.length - 1; i++) {
      coord.push(sin * Math.cos(ang[i]));
      sin *= Math.sin(ang[i]);
    }
    coord.push(sin * Math.sin(ang[i]));
    Math.max(...coord);
    return new Vector(...coord);
  }
  add(...vect:Array<Vector>): Vector {
    vect.push(this);
    let coord = [];
    let len = Math.max(...vect.map(v => v.coord.length));
    for (var i = 0; i < len; i++)
      coord[i] = vect.map(v => v.coord[i] || 0).reduce((a, b) => a + b);
    return new Vector(...coord);
  }
  sub(v2: Vector): Vector {
    return this.add(v2.inv());
  }
  mul(a: number): Vector {
    return new Vector(...this.coord.map(c => c * a));
  }
  div(a: number): Vector {
    return this.mul(1 / a);
  }
  inv(): Vector {
    return this.mul(-1);
  }
  mix(v, a): Vector {
    return this.mul(1 - a).add(v.mul(a));
  }
  len(a: number = null): Vector | number {
    var len = Math.hypot(...this.coord);
    if (a === null)
      return len;
    return this.mul(a / len);
  }
  norm() {
    return this.len(1);
  }
  dist(v) {
    return this.sub(v).len();
  }
  dot(...vect) {
    vect.push(this);
    let coord = [];
    let len = Math.max(...vect.map(v => v.coord.length));
    for (var i = 0; i < len; i++)
      coord[i] = vect.map(v => v.coord[i] || 0).reduce((a, b) => a * b);
    return coord.reduce((a, b) => a + b);
  }
  polar() {
    let ret = [];
    let a = 0;
    let first = true;
    for (let i = this.coord.length - 1; i >= 0; i--) {
      let c = this.coord[i];
      a += c * c;
      ret.unshift(Math.acos(c / Math.sqrt(a)));
      if (first) {
        first = false;
        ret[0] = Math.PI * 2 - ret[0];
      }
    }
    ret.unshift(a);
    return ret;
  }
}
