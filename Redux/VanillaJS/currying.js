function sum(x, y, z) {
  return x + y + z;
}

// currying = use inner functions + closure => convert one function with multiple parameters into multiple functions with single parameter each
function currySum(x) {
  return function sumY(y) {
    return function sumZ(z) {
      return x + y + z;
    };
  };
}

const res1 = sum(10, 20, 30);

const res2 = currySum(10)(20)(30);
// equivalent to
const resX = currySum(10);
const resY = resX(20);
const res3 = resY(30);

console.log(res1, res2, res3);
