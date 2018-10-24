const pb = document.querySelectorAll('.photo-cube');
const cc = document.querySelectorAll('.cube-container');
const hold = document.querySelector('.hold');
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
let scrY;
function rotate(e) {
  const xPos = (e.touches ? Math.floor(e.touches[0].clientX) : e.x);
  const yPos = (e.touches ? Math.floor(e.touches[0].clientY) : e.y) + scrY;
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
  hold.addEventListener('mousemove', rotate, { passive: true });
  hold.addEventListener('touchmove', rotate, { passive: true });
  scrY = window.scrollY;
  const cubeZeroCtr = getCenter(cc[0]);
  const cubeOneCtr = getCenter(cc[1]);
  xStart = (e.x || Math.floor(e.touches[0].clientX));
  yStart = (e.y || Math.floor(e.touches[0].clientY)) + scrY;
  const distFromCubeZero = Math.round(Math.hypot(cubeZeroCtr.x - xStart, cubeZeroCtr.y - yStart));
  const distFromCubeOne = Math.round(Math.hypot(cubeOneCtr.x - xStart, cubeOneCtr.y - yStart));
  if (distFromCubeZero <= distFromCubeOne) {
    whichPB = 0;
  } else {
    whichPB = 1;
  }
}
function releaseCube() {
  rotObj[whichPB].x = rotObj[whichPB].xs || 0;
  rotObj[whichPB].y = rotObj[whichPB].ys || 0;
  hold.removeEventListener('mousemove', rotate, { passive: true });
  hold.removeEventListener('touchmove', rotate, { passive: true });
}
hold.addEventListener('mousedown', getCube, { passive: true });
hold.addEventListener('touchstart', getCube, { passive: true });
hold.addEventListener('mouseup', releaseCube);
hold.addEventListener('touchend', releaseCube);
hold.addEventListener('mouseleave', releaseCube);
document.addEventListener('touchmove', e => {
  if (e.target.tagName === 'CUBE-PANEL') {
    e.preventDefault();
  }
}, {passive: false});
