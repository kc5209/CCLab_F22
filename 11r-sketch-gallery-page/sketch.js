function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
  background(0);

  for (let e = 0; e < 500; e = e + 1) {
    let x1 = random(500);
    let y1 = e * 5 + 10;
    let x2 = e * 5 + 10
    let y2 = random(400)
    let dia = 150 * sin(e)
    let freq = map(e, 2, 9, 9, 300);
    let color = map(e, 0, 9, 0, 255);
    fill(random(240, 7, 92));
    rect(x1, y1, dia)

    for (let e = 0; e < 500; e = e + 1) {
      let x1 = random(500);
      let y1 = e * 20 + 10;
      let dia = 150 * sin(e)
      let freq = map(e, 2, 5, 5, 150);
      let color = map(e, 0, 9, 0, 255);
      strokeWeight(random(3))
      fill(216, 7, 84);
      rect(x2, y2, dia)
    }
  }
}

