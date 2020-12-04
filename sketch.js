var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  monkey=createSprite(60,height-75,10,10);  
  monkey.addAnimation("run",monkey_running);
  //Scaling to adjust the animation
  monkey.scale=0.150;
  
  ground = createSprite(400,360,900,5);
 ground.velocityX = -4;
  ground.x = ground.width/2;
    invisibleGround = createSprite(497,367,990,5);
  invisibleGround.visible = false;
  
  obstaclesGroup =  new Group();
  bananasGroup = new Group();
  
  score = 0;
  survialTime = 0;
}

function draw() {
  background("black");
   if (gameState===PLAY){
   ground.velocityX = -4;
 
  }
  if(keyDown("space")&&monkey.y>300){
    monkey.velocityY = -20;
  }
  
       monkey.velocityY = monkey.velocityY + 0.8;
 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     monkey.collide(ground);
  
if(monkey.isTouching(bananasGroup)){
  bananasGroup.destroyEach();
  score = score+2;
}
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.12; 
    
  }
    spawnBananas();
    spawnObstacles();
  
  if(score%10===0)
    {
      background("white");
    }
   else if(score%5===0) {
      background("skyblue");
    }
   else if(score%8===0){
      background("pink");
    }

  fill("white");
  stroke("red");
  textSize(15);
  survialTime = Math.ceil(frameCount/frameRate());
  text("survialTime: " + survialTime, 20, 20);
  
  fill("white");
  stroke("red");
  textSize(15);
//score = score + Math.round(getFrameRate()/61);
  text("Score: " + score, 300, 20);
   
  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 80 === 0) {
   var obstacle = createSprite(597,328,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -8
   obstacle.scale = 0.20;
   fill("red")
   obstaclesGroup.add(obstacle);  
  }
}

function spawnBananas(){
  if (frameCount % 40 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.lifetime = 200;
    banana.scale = 0.15;
    banana.velocityX = -10;
    bananasGroup.add(banana);  
  }
}