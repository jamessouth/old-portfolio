class BorderPaint {

  pipe(...fns) {
    return function inner(start) {
      return fns.reduce((val, fn) => fn(val), start);
    };
  }

  getHue() {
    return Math.floor(Math.random() * 101) + 190;
  }

  getDirectionInRadians() {
    return Math.random() * Math.PI;
  }

  getHypoLength(ang) {
    return 10 / Math.cos(ang);
  }

  getCoord(hypo) {
    const dir = hypo < 0 ? -1 : 1;
    const opSide = Math.sqrt((hypo * hypo) - 100);
    return opSide * dir;
  }

  getWidth() {
    return Math.floor(Math.random() * 10) + 2;
  }

  paint(ctx, geom, props) {
    for (let i = 0; i < 49; i++) {

      const opLen = this.pipe(
        this.getHypoLength,
        this.getCoord,
        Math.round)(this.getDirectionInRadians());

      const stPt = i * 6;
      ctx.beginPath();
      ctx.moveTo(stPt, 425);
      ctx.lineTo(stPt + opLen, 435);
      ctx.lineWidth = this.getWidth();
      ctx.strokeStyle = `hsl(${this.getHue()}deg, 85%, 49%)`;
      ctx.stroke();
    }
  }
}
registerPaint('borderPaint', BorderPaint);
