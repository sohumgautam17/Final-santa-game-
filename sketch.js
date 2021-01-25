const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var backimg, santa, santaBody;
var engine, world;
var snow = [];
var maxSnowFlakes = 30

; 
var ground; 
var santaImg;
var cookieImg, presentImg, cadyCaneImg, grinchImg, coinImg, playImg, snowImg, startBgImg, bombImg, explosionImg, endImg, replayImg;
var xmasSound, rules;
var fastForwardImg;
var obstaclesGroup, grinchGroup, coinGroup, endSprite;
var score=0;
var playImg;
var play1;
var rules,rulesImage;
var gameState = "serve";
var startSprite;
var startBg;

function preload(){

backimg = loadImage("bg1.jpg");

santaImg = loadImage("santa.jpg")
cookieImg = loadImage("cookie2.png")
candyCaneImg = loadImage("candyCane2.png")
presentImg = loadImage("present2.png")
grinchImg = loadAnimation("grinch1.png","grinch2.png","grinch3.png", "grinch4.png", "grinch5.png", "grinch6.png", "grinch7.png", "grinch8.png", "grinch9.png", "grinch10.png", "grinch11.png", );
playImg = loadImage("play.png")
coinImg = loadAnimation("coin1.png", "coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png");
xmasSound = loadSound("Recording.m4a");
rulesImage = loadImage("pressStart.jpg");
startBgImg = loadImage("ChristmasBg2");
bombImg = loadImage("bomb.png");
//explosionImg = loadImage("explosion.png");
endImg = loadImage("gameOver.png");
replayImg = loadImage("replay.png");

fastForwardImg = loadImage("fastForward.png")
playImg=loadImage("play.png");  
}

function setup() 
{
 engine = Engine.create();
 world = engine.world;
 createCanvas(windowWidth, windowHeight);
 text("Score:" + score, 500, 100);
 fill("black")
  //console.log(score);
  //xmasSound.loop();
  back1=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  back1.addImage(backimg);
  back1.x=back1.width/2;
  back1.velocityX=-4;
  back1.scale = 2
 
  santa = createSprite(200, height-200, 90, 70);
  santa.addImage(santaImg);
  santa.scale = .5;

  ground = createSprite(width/2,height-200,width,50);
  ground.x = ground.width /2;
  ground.visible = false;

  startBg=createSprite(windowWidth/2, windowHeight/2, 100, 100);
  startBg.addImage(startBgImg)
  startBg.scale = .5
  startBg.scale=0.8
  startSprite=createSprite(windowWidth/2,windowHeight/2,10,10)
  startSprite.addImage(playImg);

  endSprite=createSprite(windowWidth/2,windowHeight/2, windowWidth, windowHeight);
  endSprite.addImage(endImg);

  replaySprite = createSprite(windowWidth/2-75,windowHeight/2+300, windowWidth, windowHeight);
  replaySprite.addImage(replayImg);
    for (var j = 0; j < maxSnowFlakes; j++) 
    {
     snow.push(new Snow(random(0,width), random(0,height)));
    }

    obstaclesGroup = new Group();
    grinchGroup = new Group();
    coinGroup = new Group();
    bombGroup = new Group();
}


function draw() {

  background("white");

  Engine.update(engine);
  if(gameState==="serve")
  { 
   
    console.log(gameState);
    startSprite.visible=true;
    startBg.visible=true;
    back1.visible=false;
    santa.visible=false;
    ground.visible=false;
    endSprite.visible=false;
    replaySprite.visible=false;
    //endSprite.visible=true;
    if(mousePressedOver(startSprite))
    {
      gameState="play";
      score = 0;
    }
    drawSprites();
  }

else if(gameState==="play")
{
      startSprite.visible=false;
      startBg.visible=false;
      back1.visible=true;
      santa.visible=true;
      ground.visible=false;

      endSprite.visible=false;
      replaySprite.visible=false;

        text("SCORE: "+ score, 500,50);

        ground.velocityX = -2

        if (ground.x < 0)
        {
          ground.x = ground.width/2;
        }

        if(santa.y> 100)
        {
          if(touches.length > 0 || keyDown("space"))
          {
            // console.log("hi")
            santa.velocityY = -10;
            touches = [];
          }
        }
        santa.velocityY = santa.velocityY + 1.2;


         if(back1.x< 550)
          {
            back1.x=back1.width/2;
          }

          santa.display();
          santa.collide(ground);
          drawSprites();
          for (var i = 0; i < maxSnowFlakes; i++)
          {

            snow[i].display();
            snow[i].updateY();      
          }
          spawnCookies();

          spawnGrinches();

          spawnCoins();


        for(var i=0;i<obstaclesGroup.length;i++)
        {
          if(obstaclesGroup.get(i).isTouching(santa))
          {
            //console.log("score before:"+score)
            score = score+2;
            //console.log("score after:"+score);
            obstaclesGroup.get(i).destroy();
          }
        }

      for(var i=0;i<grinchGroup.length;i++)
      {
        if(grinchGroup.get(i).isTouching(santa))
        {
          score = score-10;
          grinchGroup.get(i).destroy();
        }
      }

      for(var i=0;i<coinGroup.length;i++)
      {
        if(coinGroup.get(i).isTouching(santa))
        {
          score = score+10;
          coinGroup.get(i).destroy();
        }
      }
  if(score > 0)
  { 
    spawnBombs();
  }

  for(var i=0;i<bombGroup.length;i++)
  {
    
    if(bombGroup.get(i).isTouching(santa))
    {
      bombGroup.get(i).destroy();
  
      gameState="end";
      
    }
  }

if(score<0){
  score = 0
}

}

else if(gameState==="end")
{
  
  //background("blue")
 

  text("SCORE : "+score, windowWidth/2-100,windowHeight/2+200)
  fill("white")

  if(mousePressedOver(replaySprite))
  {
    gameState="serve";
   score = 0

   
      console.log(gameState)
  }
  //endSprite.x=back1.width/2;
  //endSprite.velocityX=-4;
  endSprite.scale = 0.8;
  //startSprite.scale=2;

  //endSprite.visible=true;
  startSprite.visible=false;
  startBg.visible=true;
  back1.visible=false;
  santa.visible=true;
  ground.visible=false;
  endSprite.visible=true;
  replaySprite.visible=true;
  obstaclesGroup.destroyEach();
  grinchGroup.destroyEach();
  bombGroup.destroyEach();
  coinGroup.destroyEach();
  drawSprites();
  
}









  text("SCORE: "+ score, 500,50);


}
function spawnCookies() {
  var randY = random(100,  height-200);


  if(frameCount % 160 === 0) {
    var obstacle = createSprite(width , randY,10,40);
    obstacle.velocityX = -6;

    //console.log(obstacle);

    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(cookieImg);
              break;
      case 2: obstacle.addImage(candyCaneImg);
              break;
      case 3: obstacle.addImage(presentImg);
              break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = width/4;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnGrinches() {
  var randY = random(100,  height-200);
  //write code here to spawn the grinchs
  if (frameCount % 250 === 0) {
    var grinch = createSprite(width,randY,40,10);
    grinch.y = Math.round(random(100,500));
    grinch.addAnimation("running", grinchImg);
    grinch.scale = 2.3;
    grinch.velocityX = -6;

     //assign lifetime to the variable
    grinch.lifetime = width/4;


    //add each grinch to the group
    grinchGroup.add(grinch);
  }

}


function spawnCoins() {
  var randY = random(100,  height-200);
  //write code here to spawn the grinchs
  if (frameCount % 700 === 0) {
    var coin = createSprite(width,randY,40,10);
   
    coin.addAnimation("running", coinImg);
    coin.scale = .9;
    coin.velocityX = -6;

     //assign lifetime to the variable
    coin.lifetime = width/4;;


    //add each grinch to the group
    coinGroup.add(coin);
  }

} 

function spawnBombs() {
  var randY = random(100, height-200);
  //write code here to spawn the grinchs
  if (frameCount % 800 === 0) {
    var bomb = createSprite(width,randY,80,20);
    bomb.y = Math.round(random(100,500));
    bomb.addAnimation("running", bombImg);
    bomb.scale = .3;
    bomb.velocityX = -6;

     //assign lifetime to the variable
     bomb.lifetime = width/4;;


    //add each grinch to the group
    bombGroup.add(bomb);
  }

} 