class BurstPainter {
  static get inputProperties() { return ['--atick']; }
  paint(ctx, geom, props) {
    console.log('i ran.....');

    // const colors = ['red', 'green', 'blue'];
    // const size = 32;
    // for(let y = 0; y < geom.height/size; y++) {
    //   for(let x = 0; x < geom.width/size; x++) {
    //     const color = colors[(x + y) % colors.length];
    //     ctx.beginPath();
    //     ctx.fillStyle = color;
    //     ctx.rect(x * size, y * size, size, size);
    //     ctx.fill();
    //   }
    // }
    let tick = parseFloat(props.get('--atick').toString());
    if(tick < 0) {tick = 0;}
    if(tick > geom.width) {tick = geom.width;}

    const ht = geom.height/2;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0, ht);
    ctx.lineTo(tick, ht);
    ctx.stroke();




  }
}

registerPaint('burst', BurstPainter);
