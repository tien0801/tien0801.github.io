window.onload = function(){
	startGame();
}

var score = 30;
var heart = 5;
var arraySpeed = [2, 4, 10];// save array speed
var speed = arraySpeed[0];
var enemiesize = 70;
var level = 0;
var countEnemyKilled = 0;
var sound = true;
var mute = false;
var endGame = false;
var pause = false;
var boomNum = 3;
var random = (Math.floor(Math.random()*2)+1) * 100;
var useBoom = false;
var bloodList = [];
var setPause;

//Menu game canvas
var menuGame = document.getElementById("menuGame");
ctxMenu = menuGame.getContext("2d");
var bgMenu = new Image();
bgMenu.src = "images/bg-menu_opt.png";
var iconBoom = new Image();
iconBoom.src = "images/boom_opt.png";
var iconRestart = new Image();
iconRestart.src = "images/restart_opt.png";
var iconPause = new Image();
iconPause.src = "images/pause_opt.png";
var iconSound = new Image();
iconSound.src = "images/icon-sound_opt.png";
var iconMute = new Image();
iconMute.src = "images/icon-mute_opt.png";

//Screen game canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var bg = new Image();
bg.src = "images/bg_opt.jpg";
var logo2 = new Image();
logo2.src = "images/logo-big_opt.png";
var bloodIcon = new Image();
bloodIcon.src = "images/blood_opt.png";
var bgBoom = new Image();
bgBoom.src = "images/bg-boom_opt.png";


// Image game over
var bgGameover = new Image();
bgGameover.src = "images/bg2_opt.png";
var logo = new Image();
logo.src = "images/logo2_opt.jpg";

//Sound in Game
var sGame = new Audio('audio/IntroMenu.mp3');
var sEnemyDie = new Audio('audio/enemy-die.mp3');
var sBoom = new Audio('audio/boom.mp3');

//Enemies canvas
var imgEnemy1 = new Image();
imgEnemy1.src = "images/e1_opt.png";
var imgEnemy2 = new Image();
imgEnemy2.src = "images/e2_opt.png";
var enemy3 = new Image();
enemy3.src = "images/e3_opt.png";
var enemy4 = new Image();
enemy4.src = "images/e4_opt.png";
var enemy5 = new Image();
enemy5.src = "images/e5_opt.png";
var enemy6 = new Image();
enemy6.src = "images/e6_opt.png";
var enemy7 = new Image();
enemy7.src = "images/e7_opt.png";
var enemy8 = new Image();
enemy8.src = "images/e8_opt.png";
var enemy9 = new Image();
enemy9.src = "images/e9_opt.png";

// Create Enemies
var enemy1 = new Enemy(0, 0, 0,  0,  100, 440, 100, 440, true, false, imgEnemy1);// monter 1 left-top
var enemy2 = new Enemy(240, 0, 240, 0, 240, 300, 240, 300, false, false, imgEnemy2);// monter 2 center-top
var enemy3 = new Enemy(600, 0, 600,  0,  200, 440, 200, 440, false, false, enemy3);// monter 3 right-top
var enemy4 = new Enemy(0, 520, 0, 520,  200, 200, 200, 200, false, false, enemy4);// monter 3 right-top
var enemy5 = new Enemy(600, 520, 600, 520, 200, 200, 200, 200, false, false, enemy5);// monter 5 center-right
var enemy6 = new Enemy(60,  400, 60,  400, 240, 240, 240, 240, false, false, enemy6);// monter 6 left-bottom
var enemy7 = new Enemy(280, 400, 280, 400, 280, 280, 280, 280, false, false, enemy7);// monter 7 center-bottom
var enemy8 = new Enemy(520, 400, 520, 400, 280, 280, 280, 280, false, false, enemy8);// monter 1 right-bottom
var enemy9 = new Enemy(random ,random + 120, random, random + 120, 600, 480, 600, 480, false, false, enemy9);//monter 9 run random

// Create array save 9 enemy
var enemies = [enemy1, enemy2, enemy3, enemy4 , enemy5, enemy6, enemy7, enemy8, enemy9];
var reqAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

function start() {
	context.drawImage(bg, 0 ,0 ,600, 500);
	context.drawImage(logo2, 140 ,100 ,350, 150);

	// Draw Menu game
	ctxMenu.drawImage(bgMenu, 0, 0, 600, 70);
	ctxMenu.drawImage(iconSound, 160, 12, 45, 45);
	if (mute) {
		ctxMenu.drawImage(iconMute, 160, 12, 45, 45);
	}
	ctxMenu.drawImage(iconBoom, 430, 10, 50, 50);
    ctxMenu.drawImage(iconRestart, 480, 10, 50, 50);
	ctxMenu.drawImage(iconPause, 535, 10, 50, 50);
	ctxMenu.fillStyle = "white";
	ctxMenu.font = "22px Arial bold";
    ctxMenu.fillText("SCORE: " + score, 25, 40);
	ctxMenu.fillText("HEART: " + heart, 250, 40);
	ctxMenu.fillText("" + boomNum, 448, 43);
	if(useBoom) {
		context.drawImage(bgBoom, 60, 20, 480, 460);
	}
	// level
	context.fillStyle = "white";
	context.font = "22px Arial";
	context.fillText("Level: " + (level + 1), 25, 32);
}

/**
 * Function start game
 *
 */
function startGame() {
	if (pause == false && endGame == false) {
		if(sound) {
			sGame.play();
		}
   		start();
		drawBlood();
		drawEnemy();
	}
	if (score < 5 || heart < 0) {
		gameOver();
	}
	reqAnimation(startGame);
}

/**
 * Function Draw Enemies & move Ene
 *
 */
function drawEnemy() {
	for (var i = 0; i < 9; i++) {
		if (enemies[i].eShow) {
    		context.drawImage(enemies[i].imgEnemy, enemies[i].x, enemies[i].y, enemiesize, enemiesize);
			enemies[i].move();
		}
	}
}

/**
 * Function Draw icon Blood when enemy died
 *
 */
function drawBlood() {
	for (var i = 0; i < bloodList.length; i++) {
    	context.drawImage(bloodIcon, bloodList[i].x - 40, bloodList[i].y - 40, 70, 70);
	}
 }

/**
 * Function Random Enemy
 *
 */
function randomEnemy() {
	var num = Math.floor((Math.random()*7)+1);
	enemies[num].eShow = true;
	console.log("enemy: " + parseInt(num + 1));
}
/**
 * Function Position Blood
 *
 */
function blood(x, y) {
	this.x = x;
	this.y = y;
}

/**
 * Function Contruction Enemy, move enemy
 *
 */
function Enemy(beginX, beginY, x, y, moveToX, moveToY, finishX, finishY, eShow, eDie, imgEnemy) {
	this.beginX = beginX;
	this.beginY = beginY;
	this.x = x;
	this.y = y;
	this.moveToX = moveToX;
	this.moveToY = moveToY;
	this.finishX = finishX;
	this.finishY = finishY;
	this.eShow = eShow;
	this.eDie = eDie;
	this.imgEnemy = imgEnemy;
}
Enemy.prototype.move = function () {
	// when monter move maximun
	if (this.x == this.moveToX && this.y == this.moveToY) {
		this.x = this.moveToX;
		this.y = this.moveToY;
		this.moveToX = this.beginX;
		this.moveToY = this.beginY;
	}
	// move following X
	if (this.x == this.moveToX) {
			this.x = this.moveToX;
	} else {
		if (this.x > this.moveToX) {
			this.x -= speed;
		} else {
			this.x += speed;
		}
	}
	// move following Y
	if (this.y == this.moveToY) {
		this.y = this.moveToY;
	} else {
		if (this.y > this.moveToY) {
			this.y -= speed;
		} else {
			this.y += speed;
		}
	}
	// when monster return position begin and revise the original value
	if (this.x == this.beginX && this.y == this.beginY) {
		score -= 10;
		this.eShow = false;
		this.x = this.beginX;
		this.y = this.beginY;
		this.moveToX = this.finishX;
		this.moveToY = this.finishY;
		randomEnemy();
	}
 }

/**
 * Function Event mouse click in canvas
 */
canvas.addEventListener("click",function(e) {
	var mouseX = e.pageX - canvas.offsetLeft;
	var mouseY = e.pageY - canvas.offsetTop;
	console.log("toa do x,y : " + mouseX , mouseY);
	if (pause == false) {
		heart--;
		//score -= 10;
		for (var i = 0; i < 9; i++) {
			clickEnemy(mouseX, mouseY, enemies[i]);
		}
	}
 });

/**
 * Event click Menu Game canvas
 *
 */
menuGame.addEventListener("click", function(e){
	//Position mouse
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;
	console.log("toa do x,y : " + mouseX , mouseY);
	//Sound
	if(mouseX > 160 && mouseX < 205 && mouseY > 12 && mouseY < 57) {
		soundGame();
	}
	//boom
	if(mouseX > 431 && mouseX < 473 && mouseY > 15 && mouseY < 57) {
		killEnemyAll();
	}
	//pause
	if(mouseX > 536 && mouseX < 584 && mouseY > 11 && mouseY < 58) {
		pauseGame();
	}
	//restart
	if(mouseX > 480 && mouseX < 529 && mouseY > 11 && mouseY < 58) {
		restartGame();
	}
});

/**
 * Function handle event click monter
 * @param {number} position mouse X
 * @param {number} position mouse Y
 * @param {enemy} position of monter current
 */
function clickEnemy(mouseX, mouseY, enemy) {
	if (mouseX > enemy.x && mouseX <= enemy.x + enemiesize && mouseY > enemy.y &&
		 mouseY <= enemy.y + enemiesize && enemy.eShow == true) {
		countEnemyKilled ++;
		heart++;
		score += 10;
		enemy.eShow = false;
		enemy.x = enemy.beginX;
		enemy.y = enemy.beginY;
		enemy.moveToX = enemy.finishX;
		enemy.moveToY = enemy.finishY;
		sEnemyDie.play();
		var tempBlood = new blood(mouseX, mouseY);
		bloodList.push(tempBlood);

		/* set speed and level*/
		var temp = Math.floor(score/100);
		if (level < temp && temp <= 3) {
			setDefaultEnemy();
			enemy9.eShow = true;
			level = temp;
			speed = arraySpeed[level-1];
		}
		randomEnemy();
	}
 }

 /**
 * Function set default position enemy
 *
 */
function setDefaultEnemy() {
 	for (var i = 0; i < 9; i++) {
		enemies[i].x = enemies[i].beginX;
		enemies[i].y = enemies[i].beginY;
		enemies[i].moveToX = enemies[i].finishX;
		enemies[i].moveToY = enemies[i].finishY;
		enemies[i].eShow = false;
	}
}

/**
 * Function Sound Game
 *
 */
function soundGame() {
	sound = !sound;
		if(!sound) {
			sGame.pause();
			mute = true;
			console.log("off sound");
		} else {
			mute = false;
		}
}

/**
 * Kill all Enemy current
 *
 */
function killEnemyAll() {
	sBoom.play();
	if (boomNum > 0 && pause == false && endGame == false) {
		boomNum--;
		useBoom = true;
		for(var i = 0; i < 9; i++){
			if (enemies[i].eShow == true) {
				enemies[i].eShow = false;
				score += 10;
			}
		}
		setTimeout(function() {
			setDefaultEnemy();
			randomEnemy();
			useBoom = false;
		}, 1000);
	}
}

/**
 * Function Restart Game
 *
 */
function restartGame() {
	pause = false
	endGame = false;
	countEnemyKilled = 0;
	level = 0;
	speed = arraySpeed[0];
	score = 30;
	heart = 5;
	highScore = sessionStorage.getItem("highscore");
	boomNum = 3;
	bloodList = [];
	setDefaultEnemy();
	enemy1.eShow = true;
}

/**
 * Function Pause Game
 *
 */
function pauseGame() {
	pause = !pause;
	if(pause == true) {
		sGame.pause();
		context.fillStyle = "white";
		context.font = "100px Arial bold";
		context.fillText("PAUSE",150,300);
		setPause = setTimeout(function() {
			pause = false;
		}, 3000);
	}
	else {
		clearTimeout(setPause);
	}
}

/**
 * Function Game Over
 *
 */
function gameOver() {
	sGame.pause();
	pause = true;
	endGame = true;
	if (score > Number(sessionStorage.getItem("highScore"))) {
		sessionStorage.setItem("highScore", score);
	}
	context.drawImage(bgGameover, 0, 0, 600, 600);
	context.drawImage(logo, 185, 30, 220, 120);
	ctxMenu.drawImage(bgMenu, 0, 0, 600, 70);
    ctxMenu.drawImage(iconRestart, 480, 10, 50, 50);

	context.fillStyle = "red";
	context.font = "68px Arial bold";
    context.fillText("GAME OVER", 110, 210);
	context.fillStyle = "white";
    context.font = "27px Arial bold";
    context.fillText("SCORE: " + score, 240, 250);
	context.fillText("HIGH SCORE: " + sessionStorage.getItem("highScore"), 200, 280);
	context.fillText("Enemy Killed: " + countEnemyKilled, 220, 310);
}