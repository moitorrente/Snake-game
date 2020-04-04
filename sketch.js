const sections = 20;
const width = 600;
const height = 690;
const scal = width / sections;
let snake;
let apple;
let lastx = 0;
let lasty = 0;

let appleImg;
let snakeHeadUpImg;
let snakeHeadRightImg;
let snakeHeadDowmImg;
let snakeHeadLeftImg;
let snakeBodyVerImg;
let snakeBodyHorImg;
let turn1;
let turn2;
let turn3;
let turn4;
let tailUp;
let tailDown;
let tailRight;
let tailLeft;
let trophy;
let deathImg;
let punctuation = 0;
let maxPunctuation = 0;
let deaths = 0;
p5.disableFriendlyErrors = true;
function preload() {
    appleImg = loadImage('./assets/img/apple.png');
    snakeHeadUpImg = loadImage('./assets/img/headUp.png');
    snakeHeadRightImg = loadImage('./assets/img/headRight.png');
    snakeHeadDownImg = loadImage('./assets/img/headDown.png');
    snakeHeadLeftImg = loadImage('./assets/img/headLeft.png');
    snakeBodyVerImg = loadImage('./assets/img/bodyVer.png');
    snakeBodyHorImg = loadImage('./assets/img/bodyHor.png');
    turn1 = loadImage('./assets/img/turn1.png');
    turn2 = loadImage('./assets/img/turn2.png');
    turn3 = loadImage('./assets/img/turn3.png');
    turn4 = loadImage('./assets/img/turn4.png');
    tailUp = loadImage('./assets/img/tailUp.png');
    tailDown = loadImage('./assets/img/tailDown.png');
    tailRight = loadImage('./assets/img/tailRight.png');
    tailLeft = loadImage('./assets/img/tailLeft.png');
    trophy = loadImage('./assets/img/trophy.png');
    deathImg = loadImage('./assets/img/deaths.png');
}

function setup() {

    canvas = createCanvas(width, height);
    button = createButton('Up');
    button = createButton('Down');
    button = createButton('Right');
    button = createButton('Left');

    snake = new Snake();
    apple = new Apple();
    frameRate(10);
    let options = {
        preventDefault: true
    };
    let hammer = new Hammer(document.body, options);
    hammer.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
    });
    hammer.on("swipe", swiped);
}

function draw() {
    translate(0, 0);
    //scale(1.1);

    background(139, 167, 82);
    drawGrid();
    showPanel();

    if (snake.die()) {
        alert('Has perdido');
        deaths++;
    }
    apple.show();

    snake.update();
    snake.show();
    if (snake.eat(apple)) {
        punctuation++;
        apple.reappear(snake);
    }
}

function drawGrid() {
    stroke(218, 235, 183);
    for (let i = 0; i < sections; i++) {
        line(i * scal, 0, i * scal, height);
        line(0, i * scal, width, i * scal);
    }
}

function keyPressed() {
    if (lastx != snake.x || lasty != snake.y) {
        if (keyCode === RIGHT_ARROW && snake.xdir != -1) {
            snake.setDirection(1, 0);
        }
        if (keyCode === UP_ARROW && snake.ydir != 1) {
            snake.setDirection(0, -1);
        }
        if (keyCode === DOWN_ARROW && snake.ydir != -1) {
            snake.setDirection(0, 1);
        }
        if (keyCode === LEFT_ARROW && snake.xdir != 1) {
            snake.setDirection(-1, 0);
        }
        if (key === 'A') {
            snake.addTail();
        }
        lastx = snake.x;
        lasty = snake.y;
    }
}

function swiped(event) {
    if (event.direction == 4 && snake.xdir != -1) {
        snake.setDirection(1, 0);
    } else if (event.direction == 8 && snake.ydir != 1) {
        snake.setDirection(0, -1);
    } else if (event.direction == 16 && snake.ydir != -1) {
        snake.setDirection(0, 1);
    } else if (event.direction == 2 && snake.xdir != 1) {
        snake.setDirection(-1, 0);
    }
}

function showPanel() {
    fill(62, 76, 34);
    rect(0, height - 3 * scal, width, 3 * scal);
    image(appleImg, width - scal * 19.5, height - scal * 2.5, scal * 2, scal * 2);
    textSize(42);
    fill(255);
    text('x ' + punctuation, width - scal * 17, height - scal)
    if (punctuation > maxPunctuation) {
        maxPunctuation = punctuation;
    }
    image(trophy, width - scal * 13, height - scal * 2.5, scal * 2, scal * 2);
    text('x ' + maxPunctuation, width - scal * 12.5 + 2 * scal, height - scal)

    image(deathImg, width - scal * 6, height - scal * 2.5, scal * 2, scal * 2);
    text('x ' + deaths, width - scal * 5.5 + 2 * scal, height - scal)
}