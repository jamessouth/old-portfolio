let paintStart = 0;
let hh = document.querySelector('.projects');
// console.log(hh);
export default function animatePaint() {
  if (paintStart < 501) {
    requestAnimationFrame(animatePaint);
  } else {
    paintStart = 0;
    return;
  }
  hh.style.cssText = `--time: ${paintStart}`;
  paintStart += 5;
}
