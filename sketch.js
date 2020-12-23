//EDITS MADE: I corrected the monkey passing through the rocks, and the game now ends when the monkey hits the rocks.

var PLAY = 1
var END = 0
var gameState = PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 300);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  monkey = createSprite(80, 215, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 250, 900, 10);
  ground.velocityX = -4;
}


function draw() {
  background("white");
  
  text("Survival Time: " + score, 300, 100);
  
  if(gameState === PLAY) {
  
  if(keyDown("space") && monkey.y > 214) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if(ground.x < 200) {
    ground.x = ground.width/2;
  }
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
  }
  
  score = Math.ceil(frameCount/frameRate());  
  
  food();
  obstacles();
    
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
    
  }
  
  else if(gameState === END){
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    monkey.visible = false
    textSize(20);
    fill("red");
    text("GAME OVER", 100, 100);
    monkey.velocityY = 0;
    ground.velocityX = 0;
  }
  
  drawSprites();
}

function food(){
  if(frameCount%80 === 0){
    banana = createSprite(600, random(150, 230), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -10;
    banana.lifetime = 150;
    
    foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%150 === 0){
    obstacle = createSprite(600, 220, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -10;
    obstacle.lifetime = 150;
    
    obstacleGroup.add(obstacle);
  }
}