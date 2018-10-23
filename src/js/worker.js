const boxes = [];
const shades = [];
const canvArray = [];
for (let q = 0; q < 15; q += 1) {
  for (let z = 0; z < 15; z += 1) {
    boxes.push([q * 20, z * 20]);
  }
}
for (let i = 100; i >= 0; i -= 1) {
  shades.push(i / 100);
}
for (let i = 0; i < 4; i += 1) {
  for (let j = 0; j < 4; j += 1) {
    canvArray.push([j * 75, i * 75]);
  }
}
function getRands(amt) {
  const nums = new Set();
  while (nums.size < amt) {
    const n = Math.floor(Math.random() * amt);
    nums.add(n);
  }
  return [...nums];
}
function randomizeBoxes() {
  const randos = getRands(boxes.length);
  const randArray = [];
  randos.forEach((x, i) => {
    randArray[x] = boxes[i];
  });
  return randArray;
}
const randBoxes = randomizeBoxes();
function checkBoard() {
  const randos = getRands(canvArray.length - 1);
  const solArray = [];
  randos.forEach((x, i) => {
    solArray[x] = i;
  });
  return [solArray.concat([15]), randos.concat([15])];
}
function getInversions(arr) {
  let inversions = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] == null) { continue; }
    for (let j = 0; j < arr.length; j += 1) {
      if (arr[i] > arr[j + i]) {
        inversions += 1;
      }
    }
  }
  return inversions;
}
let doable = checkBoard();
while (getInversions(doable[0]) % 2 !== 0) {
  doable = checkBoard();
}
const [boardOrder, drawOrder] = doable;
postMessage({
  shades, canvArray, randBoxes, boardOrder, drawOrder,
});
