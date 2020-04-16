var clouds = [];
var beeImg; 
var bee;
var beeAnim;
var beeArr = [];
var xPos, yPos;

function preload() {
  beeAnim = loadAnimation("bees/Bee_1b.png", "bees/Bee_2b.png", "bees/Bee_3b.png", "bees/Bee_4b.png", "bees/Bee_5b.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 20; i++) { 
    clouds[i] = new cloud(); 
  }

  for (var i = 0; i < 3; i++) {
     beeArr[i] = new bug();
  }
}

 function draw() {
  background(255);
    
   backs(); 

    for (var i = 0; i < clouds.length; i++) {
      clouds[i].move();
      clouds[i].display();
    }

    for (var i = 0; i < beeArr.length; i++) {
      beeArr[i].display();
    }
}

function backs() {
   //blue sky
    fill('#87CEEB');
    noStroke();
    rect(0, 0, windowWidth, windowHeight);
    
    //green grass
    fill('#2FC969')
    grassHeight =  windowHeight- (.5 * windowHeight);
    rect(0, 500, windowWidth, grassHeight);
}

function cloud(){
  this.x = random(0, width);
  this.y = random(0, (.5 * height));
  
  this.display = function() {
    stroke(255);
    strokeWeight(1);
    fill(255);
    ellipse(this.x, this.y, 24, 24);
    ellipse(this.x+10,this.y+10,24,24);
    ellipse(this.x+30,this.y+10,24,24);
    ellipse(this.x+30,this.y-10,24,24);
    ellipse(this.x+20,this.y-10,24,24);
    ellipse(this.x+40,this.y,24,24);
  }
  
  this.move = function() {
    this.x = this.x += 1 ;
    this.y = this.y + random(-1, 1);
    
    if(this.x >= windowWidth){
      this.x = 0;
    }
  }
}

function bug() {
  this.display = function() {
    bee = createSprite(random(10, (windowWidth-100)), random(10, (windowHeight-100)));
    bee.addAnimation("fly", beeAnim);
    beeAnim.play();
    drawSprites();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}