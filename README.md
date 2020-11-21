# Vector.js
nD vector javascript library

## install

```shell
npm i ndvector
```

## reference

```typescript

// Set
constructor(...coord)
static polar(r: number = 0, ...ang: number[]): Vector

// Get
coord: number[]
polar(): number[]

// Math
add(...vect: Vector[]): Vector
sub(v2: Vector): Vector
mul(a: number): Vector
div(a: number): Vector
inv(): Vector
mix(v, a): Vector

// Vector length
len(): number
len(a: number): Vector
norm(): Vector

// Coord diff
dist(v): Number

// Dot product
dot(...vect): Number
```

## example

```javascript
var v1 = Vector(1, 4, 2);
var v2 = Vector(3, 6, 5);
var v3 = v1.add(v2);

v3.coord; // [4, 10, 7];
v3.mul(3).coord; // [12, 30, 21];
v3.div(2).coord; // [2, 5, 3.5];

var v4 = Vector(3, 4);
console.log(v4.len()); // 5
```