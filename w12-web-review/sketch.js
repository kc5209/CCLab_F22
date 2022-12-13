function setup() {
  let canvas = createCanvas(200, 300);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
  let x = random(width);
  let y = random(height);
  let dia = random(10, 30);
  circle(x, y, dia);
}