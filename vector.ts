export default class Vector {
  coord!: number[]
  constructor(...coord: number[]) {
    if (!(this instanceof Vector)) return new Vector(...coord)
    this.coord = coord
    while (coord.length > 0 && coord[coord.length - 1] === 0) coord.pop()
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
    let a = 0
    for (let i = 1; i < this.coord.length; i++) {
      const y = this.coord[i]
      if (i === 1) {
        const x = this.coord[i - 1]
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
  mix(v: Vector, a = 0.5): Vector {
    return this.mul(1 - a).add(v.mul(a))
  }
  len(): number
  len(a: number): Vector
  len(a?: number): number | Vector {
    if (a == null) return Math.hypot(...this.coord)
    return this.mul(a / this.len())
  }
  norm(): Vector {
    return this.len(1)
  }
  dist(v: Vector): number {
    return this.sub(v).len()
  }
  dot(...vect: Vector[]): number {
    vect.push(this)
    const coord = []
    const len = Math.max(...vect.map(v => v.coord.length))
    for (let i = 0; i < len; i++)
      coord[i] = vect.map(v => v.coord[i] || 0).reduce((a, b) => a * b)
    return coord.reduce((a, b) => a + b)
  }
}
