let paintStart = 0;
let hh = document.querySelector('h1');

export default function animatePaint() {
  if (paintStart < 900) {
    requestAnimationFrame(animatePaint);
  } else {
    return;
  }
  hh.style.cssText = `--a: ${paintStart}`;
  paintStart += 5;
}
