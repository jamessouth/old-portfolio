export default class {
  static get inputProperties() { return ['--atick']; }

  paint(ctx, geom, props) {
    const tick = parseFloat(props.get('--atick').toString());
    if (tick < 300) {
      ctx.fillStyle = `hsl(${tick + 30}deg, 85%, 49%)`;
      ctx.fillRect(0, 0, tick / 2, geom.height);
      ctx.fillRect(geom.width - tick / 2, 0, geom.width, geom.height);
    } else {
      ctx.fillStyle = `hsl(${(tick % 30) + 15}deg, 85%, 49%)`;
      ctx.arc(geom.width / 2, geom.height / 2, 19 * Math.log(tick - 300) + 5, 0, Math.PI * 2);
    }
    ctx.fill();
  }
}
