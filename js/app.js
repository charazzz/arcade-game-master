"use strict";

class Entities {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    // Draw on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Enemies Object & methods
class Enemy extends Entities {
    constructor(speed, row, sprite, x, y) {
        super(sprite, x, y);
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
        this.x = -100;

        switch (row) {
            case 1:
                this.y = 55;
                break;
            case 2:
                this.y = 140;
                break;
            case 3:
                this.y = 225;
                break;
        }
    }
    
    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // multiplication any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + this.speed * dt;
        if (this.x > 500) this.x = -100;
    }
}

//Player Object & methods
class Player extends Entities {
    constructor(score, lives, heart, sprite, x, y) {
        super(sprite, x, y);
        // The row & column for our player
        this.x = 200;
        this.y = 380;
        //Score counter
        this.score = 0;
        //Lives counter
        this.lives = 5;
        //Lives & character images
        this.heart = 'images/Heart.png';
        this.sprite = 'images/char-boy.png';
    }

    // Update the player's position & score
    update() {
        this.x = 200;
        this.y = 380;
        this.score = this.score + 1;
    }

    //Calculate the player's score
    calculateScore() {
        ctx.fillStyle = 'black';
        ctx.font = '36px impact';
        ctx.fillText(`Score: ${this.score}`, 10, 35);
    }

    //Calculate the player's lives
    calculateLives() {
        ctx.drawImage(Resources.get(this.heart), 430, 2, 40, 40);
        ctx.fillStyle = 'black';
        ctx.font = '36px impact';
        ctx.fillText(this.lives, 480, 35);
    }

    //Reset the player
    reset() {
        this.x = 200;
        this.y = 380;

        ctx.strokeText(this.score, 10, 10);
    }
}

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//What to do when each key is pressed
Player.prototype.handleInput = function (key) {
    if (key === 'left') {
        if (this.x > 0) {
            this.x = this.x - 100;
        }
    }
    if (key === 'right') {
        if (this.x < 400) {
            this.x = this.x + 100;
        }
    }
    if (key === 'up') {
        if (this.y > 20) {
            this.y = this.y - 80;
        }
    }
    if (key === 'down') {
        if (this.y < 380) {
            this.y = this.y + 80;
        }
    }
}

// Now we instantiate our objects.
// Placed all enemy objects in an array called allEnemies
// Placed the player object in a variable called player

var allEnemies = [];
var player;
var player = new Player();

// Get random numbers for enemies' speed and row.
for (let i = 0; i < 5; i++) {
    var randomSpeed = randomNumber(10, 40) * 10;
    var randomRow = randomNumber(1, 4);
    allEnemies[i] = new Enemy(randomSpeed, randomRow);
}

//Function that gets random numbers
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
