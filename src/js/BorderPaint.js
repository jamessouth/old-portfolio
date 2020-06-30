class BorderPaint {
  static pipe(...fns) {
    return function inner(start) {
      return fns.reduce((val, fn) => fn(val), start);
    };
  }

  static getNum(range, mod) {
    return Math.floor(Math.random() * range) - mod;
  }

  static getDirectionInRadians() {
    return Math.random() * Math.PI;
  }

  static getHypoLength(ang) {
    return 10 / Math.cos(ang); // 10 is the height of the border area
  }

  static getCoord(hypo) {
    const dir = hypo < 0 ? -1 : 1;
    const opSide = Math.sqrt((hypo * hypo) - 100);
    return opSide * dir;
  }

  paint(ctx, geom, props) { // eslint-disable-line
    for (let i = 0; i < 49; i += 1) {
      const dir = BorderPaint.getDirectionInRadians();

      const opLen = BorderPaint.pipe(BorderPaint.getHypoLength,
        BorderPaint.getCoord, Math.round)(dir);

      const stPt = i * 6;
      ctx.beginPath();
      ctx.moveTo(stPt, 425);
      ctx.lineTo(stPt + opLen, 435);
      ctx.lineWidth = BorderPaint.getNum(10, -2);
      ctx.strokeStyle = `hsl(${BorderPaint.getNum(41, -317)}deg, ${BorderPaint.getNum(30, -70)}%, ${BorderPaint.getNum(30, -30)}%)`;
      ctx.stroke();
    }
  }
}
registerPaint('borderPaint', BorderPaint); // eslint-disable-line
