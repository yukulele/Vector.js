class Vector {
  coord: number[]
  constructor(...coord) {
    if (!(this instanceof Vector)) return new Vector(...coord)
    this.coord = coord
    while (coord.length > 0 && coord[coord.length - 1] == 0) coord.pop()
  }
  [Symbol.iterator]() {
    return this.coord[Symbol.iterator]()
  }
  static polar(r: number = 0, ...ang: number[]) {
    const coord: number[] = []
    let cos = r
    for (let i = ang.length - 1; i >= 0; i--) {
      coord.unshift(cos * Math.sin(ang[i]))
      cos *= Math.cos(ang[i])
    }
    coord.unshift(cos)
    return new Vector(...coord)
  }
  polar(): number[] {
    const ret: number[] = []
    let a: number = null
    let first = true
    for (let i = 1; i < this.coord.length; i++) {
      const x = this.coord[i - 1]
      const y = this.coord[i]
      if (a === null) {
        ret.push(Math.atan2(y, x))
        a = x * x
      } else {
        ret.push(Math.atan2(y, Math.sqrt(a)))
      }
      a += y * y
    }
    ret.unshift(Math.sqrt(a))
    return ret
  }
  add(...vect: Vector[]): Vector {
    vect.push(this)
    const coord = []
    const len = Math.max(...vect.map(v => v.coord.length))
    for (let i = 0; i < len; i++)
      coord[i] = vect.map(v => v.coord[i] || 0).reduce((a, b) => a + b)
    return new Vector(...coord)
  }
  sub(v2: Vector): Vector {
    return this.add(v2.inv())
  }
  mul(a: number): Vector {
    return new Vector(...this.coord.map(c => c * a))
  }
  div(a: number): Vector {
    return this.mul(1 / a)
  }
  inv(): Vector {
    return this.mul(-1)
  }
  mix(v, a): Vector {
    return this.mul(1 - a).add(v.mul(a))
  }
  len(): number
  len(a: number): Vector
  len(a?: number): number | Vector {
    if (a === void 0) return Math.hypot(...this.coord)
    return this.mul(a / this.len())
  }
  norm(): Vector {
    return this.len(1)
  }
  dist(v): number {
    return this.sub(v).len()
  }
  dot(...vect): number {
    vect.push(this)
    const coord = []
    const len = Math.max(...vect.map(v => v.coord.length))
    for (let i = 0; i < len; i++)
      coord[i] = vect.map(v => v.coord[i] || 0).reduce((a, b) => a * b)
    return coord.reduce((a, b) => a + b)
  }
}
