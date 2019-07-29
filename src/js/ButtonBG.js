class ButtonBG {
  paint(ctx, geom, props) { // eslint-disable-line
    ctx.beginPath();
    ctx.moveTo(55, 5);
    ctx.quadraticCurveTo(5, 5, 5, 52.5); //top
    ctx.quadraticCurveTo(5, 90, 30, 90); //left side
    ctx.quadraticCurveTo(30, 110, 10, 115); //left of triangle
    ctx.quadraticCurveTo(40, 110, 45, 90); // right of tri
    ctx.quadraticCurveTo(115, 95, 115, 52.5); //bottom
    ctx.quadraticCurveTo(118, 2, 55, 5); //right and upper right
    ctx.fill('evenodd');
    ctx.stroke();
  }
}
registerPaint('buttonBG', ButtonBG); // eslint-disable-line
