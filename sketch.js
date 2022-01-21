var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var topGroup
var bottomGroup

function preload(){
bgImg = loadImage("assets/bg.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obsBottom1img = loadImage("assets/obsBottom1.png")
obsBottom2img = loadImage("assets/obsBottom2.png")
obsBottom3img = loadImage("assets/obsBottom3.png")
obstop1img = loadImage("assets/obsTop1.png")
obstop2img = loadImage("assets/obsTop2.png")
gameOverImage = loadImage ("assets/gameOver.png")
die = loadSound ("assets/die.mp3")
jump = loadSound ("assets/jump.mp3")

}

function setup(){
createCanvas (windowWidth,windowHeight)

//background image
bg = createSprite(windowWidth/2+300, windowHeight/2+200);
bg.addImage(bgImg);
bg.scale = 2.5
bg.x = bg.width/2  
bg.velocityX = -2
//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.4;

gameover = createSprite (windowWidth/2 , windowHeight/ 2 )
gameover.addImage ( gameOverImage )
gameover.scale = 0.9
gameover.visible = false 

topGroup = new Group ();
bottomGroup = new Group ();

}

function draw() {
  
  background("white");
        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            jump.play()
          
          }
         
          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
    
            if (bg.x<0) {
                bg.x = bg.width/2 
              }  
              
          if (bottomGroup.isTouching(balloon) || topGroup.isTouching (balloon) || balloon.y > windowHeight/2+350 ) {
    
            bottomGroup.setVelocityXEach(0)
            topGroup.setVelocityXEach (0)
            balloon.velocityY= 0 
            bg.velocityX= 0 
            bottomGroup.destroyEach ()
            topGroup.destroyEach ()
            gameover.visible = true 
            balloon.visible = false 
            die.play ()
          }
 topObstacles ();
 bottomObstacles ();
          drawSprites();
          
}
function topObstacles() {
  
  if (frameCount % 200 === 0) {
    var top = createSprite(windowWidth/2+550, windowHeight/2-100);
   top.y = Math.round(random(windowHeight/2,windowHeight/2-300));
     
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: top.addImage(obstop2img);
              break;
      case 2: top.addImage(obstop1img);
             break; 
            }

   top.scale = 0.2;
   top.velocityX = -3;
   
   // top.lifetime = 200;
   // top.depth = top.depth;
   // top.depth = top.depth + 1;
  
    topGroup.add(top);
  }
}

function bottomObstacles() {
  
  if (frameCount % 250 === 0) {
    var bottom = createSprite(windowWidth/2+550, windowHeight/2+250);
  // bottom.y = Math.round(random(windowHeight/2,windowHeight/2-250));
     
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: bottom.addImage(obsBottom2img);
              break;
      case 2: bottom.addImage(obsBottom1img);
             break; 
      case 3: bottom.addImage(obsBottom3img);
             break; 
            }

   bottom.scale = 0.15;
   bottom.velocityX = -3;
  
    bottomGroup.add(bottom);
  }
}

