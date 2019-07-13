class BorderPaint {
  // static get inputProperties() { return ['--time']; }
  getHue() {
    return Math.floor(Math.random() * 61) + 210;
  }

  getDirection() {
    return Math.floor(Math.random() * 1000) % 360;
  }

  getWidth() {
    return Math.floor(Math.random() * 25) + 4;
  }

  paint(ctx, geom, props) {
    // console.log(geom, parseInt(props.get('--time')));
    // const tick = parseFloat(props.get('--time').toString());
    // const direction =
    // const width =
    // const hue =


    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      let stPt = i * 29;
      ctx.moveTo(stPt, 430);
      ctx.lineTo(stPt + 15, 425)

      ctx.lineWidth = 5;
      ctx.strokeStyle = `hsl(${this.getHue()}deg, 85%, 49%)`;
          ctx.stroke();
      // ctx.fill();
      // ctx.fillRect(, 430, 288, this.getWidth());
    }




  }
}
registerPaint('borderPaint', BorderPaint);
