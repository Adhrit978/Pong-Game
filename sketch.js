var Ball;
var ComputerPaddle;
var PlayerPaddle;
var Edges;
//Setting the game state to start
var gameState="start";
var cscore=0;
var pscore=0;
function setup() {
//creating Paddles
ComputerPaddle=createSprite(20, 200, 10, 70);
ComputerPaddle.shapeColor="red";
PlayerPaddle=createSprite(380, 200, 10, 70);
PlayerPaddle.shapeColor="blue";
//Creating the ball
Ball=createSprite(200, 200, 13, 13);
Ball.shapeColor="green";
Edges=createEdgeSprites();
}
function draw() {
  background("black");
  stroke("white");
  textSize(20);
  text(cscore, 170, 20);
  text(pscore, 220, 20);
  if (gameState==="start") {
    textSize(30);
    text ("Press space to serve", 65, 180);
  }
  if ((gameState==="start")&&(keyDown("space"))) {
    serve();
    gameState="play";
  }
  //Creating a net to draw the dotted line
  drawnet();
  //Making the ball bounce off the paddles and edges
  bounceoff_edges_paddles();
  //Making the player paddle follow the mouse
  PlayerPaddle.y=mouseY;
  //Making the computer paddle follow the ball
  ComputerPaddle.y=Ball.y;
  //resetting if the ball hits the left or right edge
  if (Ball.isTouching(Edges[0])) {
    pscore=pscore+1;
    text(pscore, 170, 20);
    Ball.velocityX=0;
    Ball.velocityY=0;
    textSize(30);
    serve2();
    gameState="start";
  }
  if (Ball.isTouching(Edges[1])) {
   cscore=cscore+1;
   text(cscore, 170, 20);
   Ball.velocityX=0;
   Ball.velocityY=0;
   textSize(30);
   serve2();
   gameState="start";
  }
  if (cscore===5) {
    gameState="over";
    textSize(60);
    text("Game over", 50, 170);
    textSize(30);
    text("The computer wins", 70, 230);
    text("Press r to restart", 90, 260);
  }
  if (pscore===5) {
    gameState="over";
    textSize(60);
    text("Game over", 50, 170);
    textSize(30);
    text("You win", 145, 230);
    text("Press r to restart", 90, 260);
  }
  if (gameState==="over"&&keyDown("r")) {
    gameState="start";
    cscore=0;
    pscore=0;
  }
  drawSprites();
}
function drawnet() {
  for (var num=0; num<400; num=num+30) {
  line(200, num, 200, num+20);  
  }
}
function serve() {
    Ball.velocityX=-16;
    Ball.velocityY=14;
}
function serve2() {
    Ball.x=200;
    Ball.y=200;
}
function bounceoff_edges_paddles() {
  Ball.bounceOff(ComputerPaddle);
  Ball.bounceOff(PlayerPaddle);
  Ball.bounceOff(Edges[2]);
  Ball.bounceOff(Edges[3]);
}