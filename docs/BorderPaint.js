class BorderPaint {
  // static get inputProperties() { return ['--time']; }

  pipe(...fns) {
    return function inner(start) {
      return fns.reduce((val, fn) => fn(val), start);
    };
  }

  getHue() {
    return Math.floor(Math.random() * 41) + 220;
  }

  getDirectionInRadians() {
    return Math.random() * Math.PI;
  }

  getHypoLength(ang) {
    return 10 / Math.cos(ang);
  }

  getOppositeSideLength(hypo) {
    return Math.sqrt((hypo * hypo) - 100);
  }

  getWidth() {
    return Math.floor(Math.random() * 10) + 2;
  }

  paint(ctx, geom, props) {
    // console.log(geom, parseInt(props.get('--time')));
    // const tick = parseFloat(props.get('--time').toString());
    // const direction =
    // const width =
    // const hue =



    for (let i = 0; i < 36; i++) {
      const dir = this.getDirectionInRadians();

      const opLen = this.pipe(
        this.getHypoLength,
        this.getOppositeSideLength,
        Math.round)(dir);

      ctx.beginPath();
      let stPt = i * 8;
      ctx.moveTo(stPt, 425);
      ctx.lineTo(stPt + 0, 435)

      ctx.lineWidth = this.getWidth();
      ctx.strokeStyle = `hsl(${this.getHue()}deg, 85%, 49%)`;
          ctx.stroke();
      // ctx.fill();
      // ctx.fillRect(, 430, 288, this.getWidth());
    }




  }
}
registerPaint('borderPaint', BorderPaint);
