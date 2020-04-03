const sections = 20;
const width = 600;
const height = 600;
const scale = width/sections;
let snake;


function setup() {
    canvas = createCanvas(width, height);
    snake = new Snake();
    frameRate(10);
    //apple = new Apple();
}

function draw() {
    background(0);
    stroke(255);
    for(let i = 0; i< sections; i++){
        line(i * scale, 0, i * scale, height);
        line(0, i * scale, height, i * scale);
    }

    snake.show();
    snake.update();
}

function keyPressed(){
    if(keyCode === UP_ARROW){
        snake.setDirection(0, -1);
    }
    if(keyCode === DOWN_ARROW){
        snake.setDirection(0, 1);
    }
    if(keyCode === RIGHT_ARROW){
        snake.setDirection(1, 0);
    }
    if(keyCode === LEFT_ARROW){
        snake.setDirection(-1, 0);
    }
}