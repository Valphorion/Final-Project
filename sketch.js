//I used p5.play as the tool and to be honest most of what i learned about the code was the stuff about gravity and the static
//state of the sprites were the most helpful. I applied the begginer topic of Iteration to create the wall of bricks for the brick
//breaker game so I didnt have to create every single last brick from scratch. The intermediate topic I used a form of arrays using
//the grouping feature to catagorize all the aspects of the bricks before putting them throught the iteration methode to make the bricks


//first lets make the variables for all the sprites to inhabit
let ball;
let player;
let brick;
let wall1;
let wall2;
let wall3;

//Now we start making the setups for the world.
function setup() {
	new Canvas(1000, 1000);

	//Setting the world gravity so that the ball doesnt get stuck from deceleration.
	world.gravity.y = 0.5
	//The paddle and what you control using the mouse which will be adressed later
	player = new Sprite();
	player.width = 200;
	player.length = 50;
	player.h = 50;
	player.color = 'red';

	//The star of the show, the ball that will break the bricks.
	ball = new Sprite(300, 300, 50);
	ball.diameter = 40;
	ball.color = 'black';
	ball.bounciness = .5;
	ball.velocity.y = 5;
	ball.velocity.x = 5;

	//the creation of the left boundery wall which will bounce the ball away from the edge of the screen. It also acts as a special speed enhancer later on.
	wall1 = new Sprite(50,50,50,50,'s');
	wall1.color = 'green';
	wall1.rotationLock = true;

	//the creation of the right boundery wall which will do a similar function to the left boundery wall.
	wall2 = new Sprite(50,50,50,50,'s');
	wall2.color = 'green';
	wall2.rotationLock = true;

	//the creation of the ceiling which will prevent the ball from going forever upwards.
	wall3 = new Sprite(50,50,50,50, 's');
	wall3.color = 'green';
	wall3.rotationLock = true;

	//I used the knowledge from class making arrays to formulate a way to fill up the screen with bricks without having to make them all individually.
	bricks = new Group();
  	let brickRows = 5;
  	let brickCols = 10;
  	let brickWidth = (width - 50) / brickCols - 4;
  	let brickHeight = 20;
	bricks.mass = 10;


	//The iteration to use the array to perfectly create the bricks
  	for (let r = 0; r < brickRows; r++) {
		for (let c = 0; c < brickCols; c++) {
			let brickX = 50 + (c * brickWidth) + (brickWidth / 2); // Start from x = 50 (left wall)
			let brickY = 50 + (r * (brickHeight + 4)) + (brickHeight / 2) + 40; // Start from y = 50 (top wall)
	
			let brick = createSprite(brickX, brickY, brickWidth, brickHeight, 's');
			brick.shapeColor = color(random(255), random(255), random(255));
			bricks.add(brick);

			
		}
	}
}

//Now to draw the stage and set up some of the mechanics after the sprites are created.
function draw() {
	background('skyblue');
	//Time to have the paddle move, at first i wanted it to move with the arrow keys but then I thought to instead use the mouse instead for better control and timing of the bounces.
	player.moveTowards(mouse);
	//Setting the y axis an height for the paddle/player
	player.y = 900;
	//Setting the rotation to zero allows the player's paddle to stay dynamic without the flipping whenever the ball hits it.
	player.rotation = 0;

	//The if statement to determin if the ball hits the player and the subsequent speed afterwards. as well as setting the maximum and minimum speed for all future bounces.
	if (ball.overlap(player)) {
		let dx = ball.position.x - player.position.x;
		ball.velocity.y *= -1;
		ball.velocity.x = map(dx, -player.width / 2, player.width / 2, -8, 8);
	  }

	  //the if statement is how i determine if the ball hits any part of the brick an if it does then the ball reverses velocity and and keeps the speed it had before.
	  //abs stands for absolute value whih is how i determin if the ball and the bricks overlap.
	  for (let i = bricks.length - 1; i >= 0; i--) {
		if (ball.overlap(bricks[i])) {
		  let dx = ball.position.x - bricks[i].position.x;
		  let dy = ball.position.y - bricks[i].position.y;
		  if (abs(dx) > abs(dy)) {
			ball.velocity.x *= -1;
		  } else {
			ball.velocity.y *= -1;
		  }
		  bricks[i].remove();
		}
	  }

	  //The mechanic that causes a collision with the wall to become a speed booster to bring the velocity up for the bounces and cause a variation in gameplay and timing.
	  if (ball.overlap(wall1)) {
		ball.velocity.x = 5;
	  }
	  if (ball.overlap(wall2)) {
		ball.velocity.x = -5;
	  }
	
	  


	//the creation and placement of the left wall to cover the entire left side of the map
	wall1.x = 10;
	wall1.y = 500;
	wall1.h = 1000;

	//the creation and placement of the right wall to cover the entire right side of the map
	wall2.x = 990;
	wall2.y = 500;
	wall2.h = 1000;

	//the creation and placement of the ceiling to cover the full top part of the screen and the sides that the other 2 walls cover.
	wall3.x = 500;
	wall3.y = 1;
	wall3.width = 1000;

	//Failure code
	if (ball.position.y > height) {
		textSize(32);
		textAlign(CENTER, CENTER);
		fill(255, 0, 0);
		text("Game Over", width / 2, height / 2);
		noLoop();
	  }
	
	//Winning Code
	if (bricks.length === 0) {
		textSize(32);
		textAlign(CENTER, CENTER);
		fill(0, 255, 0);
		text("You Win!", width / 2, height / 2);
		noLoop();
	  }
}
