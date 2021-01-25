class Snow 
{
constructor(x, y) {
var options = {
    friction: 0.001,
    restitution:0.1,
   // frictionAir:3.0,
}

this.radius=5;
this.image = loadImage("snowball.png");
this.body = Bodies.circle(x,y,this.radius, options);
World.add(world, this.body);

this.Visiblity = 150;
}

updateY(){
    if(this.body.position.y>height){
        Matter.Body.setPosition(this.body, {x:random(0,windowWidth), y:random(0,windowHeight)})        
    }
}

display() {
  
    fill("white");
    push();
    //this.Visiblity =  this.Visiblity -10;
    tint(255,this.Visiblity);
    image(this.image, this.body.position.x, this.body.position.y, 20, 20);
    pop();
    
}
}

