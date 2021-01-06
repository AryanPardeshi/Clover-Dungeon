var bananaImage, obstacleImage, obstacleGroup, backImage, back, score, playerRunning, invGround, Monkey,  bananaGroup, score, gameState;

function preload() {
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
playerRunning=loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  backImage=loadImage("jungle.jpg");

}
function setup() {
  createCanvas(400, 400);
   back=createSprite(200,200,20,20);
  back.velocityX=-5;
  back.addImage("background",backImage);
  gameState="play";
  score=0;
  bananaGroup=new Group();
  obstacleGroup=new Group();
  invGround=createSprite(200,386,800,30);
 invGround.visible=false;
 
  Monkey=createSprite(80,0,20,20);
  Monkey.addAnimation( "monkey",playerRunning);
  Monkey.scale=0.1;
  Monkey.visible=true;
 
}

function draw() {
  background(220);
  if(gameState==="play"){ 
     if (back.x < 0){
    back.x = back.width/2;
  }
   Monkey.collide(invGround);
   Monkey.velocityY = Monkey.velocityY + 1.3;
  if(keyDown("space") && Monkey.y >=315){
    Monkey.velocityY = -23;
  }
     if (obstacleGroup.isTouching(Monkey)) {
       obstacleGroup.destroyEach();
      Monkey.visible=false;
       bananaGroup.destroyEach();
      gameState="end";
     }

  if(bananaGroup.isTouching(Monkey)) {
    bananaGroup.destroyEach();
    score=score+2;
    }
  
  switch(score){
    case 10: Monkey.scale=0.12;
      break;
    case 20: Monkey.scale=0.14;
      break;
    case 30: Monkey.scale=0.16;
      break;
    case 40: Monkey.scale=0.18;
      break;
      default: break;
  }
  
  spawnObstacles();
  spawnBanana();
  }
    if (gameState==="end") {
    textSize(20);
    text("GAME OVER",200,200);
  }
  
   drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,30,40);
}
function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,320,40,10);
     banana.y = Math.round(random(140,350));
     banana.addImage("Banana",bananaImage);
     banana.scale = 0.06;
     banana.velocityX = -5;
     banana.lifetime = 134;
    
     banana.depth = Monkey.depth + 1;
    
     bananaGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,335,10,40);
    obstacle.velocityX = -6 ;
    obstacle.addImage("Stone",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
  obstacleGroup.add(obstacle);
  }
}