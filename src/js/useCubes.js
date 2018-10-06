



const pb = document.querySelectorAll('.photo-cube');
const cc = document.querySelectorAll('.cube-container');
const hold = document.querySelector('.hold');





let isRotating = false;
let xStart;
let yStart;
let whichPB = 0;
const rotObj = {
  0: {
    x: 0,
    y: 0,
    xs: 0,
    ys: 0,
  },
  1: {
    x: 0,
    y: 0,
    xs: 0,
    ys: 0,
  },
};
function rotate(e) {
  if (!isRotating) return;
  const xPos = (e.touches ? Math.floor(e.touches[0].clientX) : e.x) + window.scrollX;
  const yPos = (e.touches ? Math.floor(e.touches[0].clientY) : e.y) + window.scrollY;
  rotObj[whichPB].xs = xPos - xStart + rotObj[whichPB].x;
  rotObj[whichPB].ys = yPos - yStart + rotObj[whichPB].y;
  pb[whichPB].style.transform = `rotateX(${-rotObj[whichPB].ys}deg) rotateY(${rotObj[whichPB].xs}deg)`;
}
function getCenter(cube) {
  return {
    x: (cube.offsetLeft + cube.offsetWidth / 2),
    y: (cube.offsetTop + cube.offsetHeight / 2),
  };
}
function getCube(e) {
  const cubeZeroCtr = getCenter(cc[0]);
  const cubeOneCtr = getCenter(cc[1]);
  xStart = (e.x || Math.floor(e.touches[0].clientX)) + window.scrollX;
  yStart = (e.y || Math.floor(e.touches[0].clientY)) + window.scrollY;
  const distFromCubeZero = Math.round(Math.hypot(cubeZeroCtr.x - xStart, cubeZeroCtr.y - yStart));
  const distFromCubeOne = Math.round(Math.hypot(cubeOneCtr.x - xStart, cubeOneCtr.y - yStart));
  if (distFromCubeZero <= distFromCubeOne) {
    whichPB = 0;
  } else {
    whichPB = 1;
  }
  isRotating = true;
}
function releaseCube() {
  isRotating = false;
  rotObj[whichPB].x = rotObj[whichPB].xs || 0;
  rotObj[whichPB].y = rotObj[whichPB].ys || 0;
}
hold.addEventListener('mousedown', getCube, { passive: true });
hold.addEventListener('touchstart', getCube, { passive: true });
hold.addEventListener('mousemove', rotate, { passive: true });
hold.addEventListener('touchmove', rotate, { passive: true });
hold.addEventListener('mouseup', releaseCube);
hold.addEventListener('touchend', releaseCube);
hold.addEventListener('mouseleave', releaseCube);
