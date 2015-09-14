# Vector.js
nD vector javascript library

## exemple

```javascript
var v1 = Vector(1, 4);
var v2 = Vector(3, 6);
var v3 = v1.add(v2);

console.log(v3.coord); // [4, 10];
console.log(v3.mul(3).coord);// [12, 30];
console.log(v3.div(2).coord);// [2, 5];

var v4 = Vector(3, 4);
console.log(v4.len());// 5
```
