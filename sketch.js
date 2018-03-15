var clouds;
var birds;
var coins;
var score = 0

function setup() {
  createCanvas(1500, 900);
  clouds = new Group();
  birds = new Group();
  coins = new Group();

  for (var i = 0; i < 12; i++) {
    var c = createSprite(
      random(width), random(height),
      random(110, 300), random(80, 250));
    c.shapeColor = color(random(80, 200), 220, random(80, 200));
    clouds.add(c);
  }
  for (var i = 0; i < 5; i++) {
    var b = createSprite(
      random(width), random(height),
      random(45,100), random(20, 40));
    b.shapeColor = color(255, 0, random(255));
    b.friction = random(0.92, 0.97);
    b.maxSpeed = random(10, 14);
    b.rotateToDirection = true;
    birds.add(b);
  }
  for (var i = 0; i < 12; i++) {
    var c = createSprite(
      random(100, width-100),
      random(100, height-100),
      15, 15);
    c.shapeColor = color(255, 225, 0);
    coins.add(c);
  }
}
function draw() {
  background(0, 180, 250);
  for (var i = 0; i < clouds.length; i++) {
    clouds[i].position.x += clouds[i].width * 0.01;
    if (clouds[i].position.x > width) {
      clouds[i].position.x = 0;
    }
  }
  for (var i = 0; i < birds.length; i++) {
    // birds[i].attractionPoint(3, mouseX, mouseY);
    birds[i].velocity.x = (mouseX - birds[i].position.x) * 0.2;
    birds[i].velocity.y = (mouseY - birds[i].position.y) * 0.2;
    
  }

  if (mouseIsPressed) {
    birds.rotation -= 2;
    }

  birds.collide(clouds);

  birds.overlap(coins, getCoin);
  drawSprites();
  fill(255, 0, 50);
  noStroke();
  // textFont(manaspace);
  textSize(60);
  textAlign(CENTER);
  if (coins.length > 0) {
    
    text(score, 100, 100);
  }
  else {
    // textFont(manaspace);
    text("you win!", width/2, height/2);
  }

}

function getCoin(player, coin) {
  coin.remove();
  score += 1;
}
