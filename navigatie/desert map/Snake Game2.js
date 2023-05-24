const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const result1 = document.getElementById("green");
const result2 = document.getElementById("blue");
const result3 = document.getElementById("white");

class snakesPart{
    constructor(X, Y){
        this.X = X;
        this.Y = Y;
    }
}

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 15;
let tileSize = canvas.width / tileCount;
let headX = 1;
let headY = 1;
let headx = 13;
let heady = 13;
const snakesParts = [];
const snakeParts = [];
let tail1 = 0;
let tail2 = 0;

let appleX = 7;
let appleY = 7;

let xVelocity = 0;
let yVelocity = 0;
let XVelocity = 0;
let YVelocity = 0;

let scores1 = 1;
let scores2 = 1;

function Game(){
    screen();
    changeSnakePostion1();
    changeSnakePostion2();
    let Results = Restart1();
    if(Results){
        return;
    }
    let results = Restart2();
    if(results){
        return;
    }
    AppleCollision();
    apple();
    snake1();
    snake2();
    setTimeout(Game, 1000 / speed);
}

function Restart1(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    if(headX < 0){
        gameOver = true;
        result2.style.display = "block";
    }
    else if(headX === tileCount){
        gameOver = true
        result2.style.display = "block";
    }
    else if(headY < 0){
        gameOver = true;
        result2.style.display = "block";
    }
    else if(headY === tileCount){
        gameOver = true
        result2.style.display = "block";
    }

    for(let I = 0; I < snakesParts.length; I++){
        let Part = snakesParts[I];
        if(Part.X === headX && Part.Y === headY){
            gameOver = true;
            result2.style.display = "block";
            break;
        }
    }
    for(let I = 0; I < snakeParts.length; I++){
        let Part = snakeParts[I];
        if(Part.x === headX && Part.y === headY){
            gameOver = true;
            result2.style.display = "block";
            break;
        }
    }
    return gameOver;
}

function Restart2(){
    let gameOver = false;

    if(YVelocity === 0 && XVelocity === 0){
        return false;
    }

    if(headx < 0){
        gameOver = true;
        result1.style.display = "block";
    }
    else if(headx === tileCount){
        gameOver = true;
        result1.style.display = "block";
    }
    else if(heady < 0){
        gameOver = true
        result1.style.display = "block";
    }
    else if(heady === tileCount){
        gameOver = true;
        result1.style.display = "block";
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headx && part.y === heady){
            gameOver = true;
            result1.style.display = "block"
        }
    }
    for(let i = 0; i < snakesParts.length; i++){
        let part = snakesParts[i];
        if(part.X === headx && part.Y === heady){
            gameOver = true;
            result1.style.display = "block"
        }
    }
    return gameOver;
}

function screen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function changeSnakePostion1(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function changeSnakePostion2(){
    headx = headx + XVelocity;
    heady = heady + YVelocity;
}

function apple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
}

function AppleCollision(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        score1.innerText = "P1 Score: " + scores1++;
        tail1++;
    }
    if(appleX === headx && appleY === heady){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        score2.innerText = "P2 Score: " + scores2++;
        tail2++;
    }
}

function snake1(){
    ctx.fillStyle = "green";
    for(let I = 0; I < snakesParts.length; I++){
        let Part = snakesParts[I];
        ctx.fillRect(Part.X * tileSize, Part.Y * tileSize, tileSize, tileSize);
    }
    snakesParts.push(new snakesPart(headX, headY));
    while(snakesParts.length > tail1){
        snakesParts.shift();
    }
    ctx.fillStyle = "green";
    ctx.fillRect(headX * tileSize, headY * tileSize, tileSize, tileSize);
}

    function wasd(event){
        if(event.keyCode == 87){
            if(yVelocity == 1)
            return;
            yVelocity = -1;
            xVelocity = 0;
        }
        if(event.keyCode == 83){
            if(yVelocity == -1)
            return;
            yVelocity = 1;
            xVelocity = 0;
        }
        if(event.keyCode == 65){
            if(xVelocity == 1)
            return;
            yVelocity = 0;
            xVelocity = -1;
        }
        if(event.keyCode == 68){
            if(xVelocity == -1)
            return;
            yVelocity = 0;
            xVelocity = 1;
        }
    }

function snake2(){
    ctx.fillStyle = "blue";
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
    }
    snakeParts.push(new snakePart(headx, heady));
    while(snakeParts.length > tail2){
        snakeParts.shift()
    }

    ctx.fillStyle = "blue";
    ctx.fillRect(headx * tileSize, heady * tileSize, tileSize, tileSize);
}

function arrow(event){
    if(event.keyCode == 38){
        if(YVelocity == 1)
            return;
        YVelocity = -1;
        XVelocity = 0;
    }
    if(event.keyCode == 40){
        if(YVelocity == -1)
            return;
        YVelocity = 1;
        XVelocity = 0;
    }
    if(event.keyCode == 37){
        if(XVelocity == 1)
            return;
        YVelocity = 0;
        XVelocity = -1;
    }
    if(event.keyCode == 39){
        if(XVelocity == -1)
            return;
        YVelocity = 0;
        XVelocity = 1;
    }
}

document.body.addEventListener("keydown", wasd);
document.body.addEventListener("keydown", arrow);

Game();