function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);

  img = loadImage("assests/image/sprite.png");
  //console.log(img.width);
}

function draw() {
  background(220);
  imageMode(CENTER)
  image(img, mouseX, mouseY);

}