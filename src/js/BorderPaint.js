class BorderPaint {
  static pipe(...fns) {
    return function inner(start) {
      return fns.reduce((val, fn) => fn(val), start);
    };
  }

  static getHue() {
    return Math.floor(Math.random() * 101) + 190;
  }

  static getDirectionInRadians() {
    return Math.random() * Math.PI;
  }

  static getHypoLength(ang) {
    return 10 / Math.cos(ang);
  }

  static getCoord(hypo) {
    const dir = hypo < 0 ? -1 : 1;
    const opSide = Math.sqrt((hypo * hypo) - 100);
    return opSide * dir;
  }

  static getWidth() {
    return Math.floor(Math.random() * 10) + 2;
  }

  paint(ctx, geom, props) { // eslint-disable-line
    for (let i = 0; i < 49; i += 1) {
      const dir = this.getDirectionInRadians();

      const opLen = this.pipe(
        this.getHypoLength,
        this.getCoord,
        Math.round,
      )(dir);

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
