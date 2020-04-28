var clouds = [];
var bee;
var beeAnim;
var bee1;
var bee1;

const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;

const modelParams = {
  flipHorizontal: true, // flip e.g for video  
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
}

function startVideo() {
  handTrack.startVideo(video).then(function(status) {
    console.log("video started", status);
    if (status) {
      updateNote.innerText = "Video started. Now tracking"
      isVideo = true
      runDetection()
    } else {
      updateNote.innerText = "Please enable video"
    }
  });
}

function toggleVideo() {
  if (!isVideo) {
    updateNote.innerText = "Starting video"
    startVideo();
  } else {
    updateNote.innerText = "Stopping video"
    handTrack.stopVideo(video)
    isVideo = false;
    updateNote.innerText = "Video stopped"
  }
}

let h1x, h1y, h2x, h2y;

function runDetection() {
  model.detect(video).then(predictions => {

    if (predictions[0] != null) {
      // for (var a in predictions[0]) {
      //   console.log(predictions[0][a]);
      // }

      h1x = predictions[0].bbox[0];
      h1y = predictions[0].bbox[1];

      if (predictions[1] != null) {
        h2x = predictions[1].bbox[0];
        h2y = predictions[1].bbox[1];
      }

    }

    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
  // detect objects in the image.
  model = lmodel
  updateNote.innerText = "Loaded Model!"
  trackButton.disabled = false
});


function preload() {
  beeAnim = loadAnimation("bees/Bee_1b.png", "bees/Bee_2b.png", "bees/Bee_3b.png", "bees/Bee_4b.png", "bees/Bee_5b.png");
}

function setup() {
  createCanvas(640, 480);
  //map(windowWidth, 0, 640, 0, windowWidth);
  //map(windowHeight, 0, 480, 0, windowHeight);

  for (var i = 0; i < 20; i++) { 
    clouds[i] = new cloud(); 
  }

  bee = createSprite(random(30, 610), random(30, 450));
  bee.addAnimation("fly", beeAnim);
  beeAnim.play();

  bee1 = createSprite(random(30, 610), random(30, 450));
  bee1.addAnimation("fly", beeAnim);
  beeAnim.play();

  bee2 = createSprite(random(30, 610), random(30, 450));
  bee2.addAnimation("fly", beeAnim);
  beeAnim.play();
}

 function draw() {
  background(255);
    
   backs(); 

    for (var i = 0; i < clouds.length; i++) {
      clouds[i].move();
      clouds[i].display();
    }

    drawSprites();

    fill("red");
    rect(h1x, h1y, 10, 10);
}

function backs() {
   //blue sky
    fill('#87CEEB');
    noStroke();
    rect(0, 0, 640, 480);
    
    //green grass
    fill('#2FC969')
    //grassHeight =  480 - (.5 * 480);
    rect(0, 0, 640, -240);
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
