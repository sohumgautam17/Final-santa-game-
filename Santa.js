class Santa{
constructor(x, y, width, height){
var options = {
    restitution: .5,
    isStatic: true
    }
    this.x = x;
    this.y = y;
     this.width = width;
    this.height = height;
    this.santa = createSprite(100, 150, 90, 70);

    this.body = Bodies.rectangle(this.x, this.y, width, height);
    this.image = loadImage("images.jpg");
    World.add(world, this.body);
}
display(){
    push();
    translate(this.body.position.x, this.body.position.y);
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.width, this.height);
    pop();
  }
}