let ball;
let player;
let brick;
let wall1;
let wall2;
let wall3;


function setup() {
	new Canvas(1000, 1000);

	world.gravity.y = 0.5
	
	player = new Sprite();
	player.width = 200;
	player.length = 50;
	player.h = 50;
	player.color = 'red';

	ball = new Sprite(300, 300, 50);
	ball.diameter = 40;
	ball.color = 'black';
	ball.bounciness = .5;
	ball.velocity.y = 5;
	ball.velocity.x = 5;
	ball.maxSpeed = 8;

	wall1 = new Sprite(50,50,50,50,'s');
	wall1.color = 'green';
	wall1.rotationLock = true;

	wall2 = new Sprite(50,50,50,50,'s');
	wall2.color = 'green';
	wall2.rotationLock = true;

	wall3 = new Sprite(50,50,50,50, 's');
	wall3.color = 'green';
	wall3.rotationLock = true;

	bricks = new Group();
  	let brickRows = 5;
  	let brickCols = 10;
  	let brickWidth = (width - 50) / brickCols - 4;
  	let brickHeight = 20;
	bricks.mass = 10;

  
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


function draw() {
	background('skyblue');
	player.moveTowards(mouse);
	player.y = 900;
	player.rotation = 0;

	if (ball.overlap(player)) {
		let dx = ball.position.x - player.position.x;
		ball.velocity.y *= -1;
		ball.velocity.x = map(dx, -player.width / 2, player.width / 2, -8, 8);
	  }

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

	  if (ball.overlap(wall1)) {
		ball.velocity.x = 5;
	  }
	  if (ball.overlap(wall2)) {
		ball.velocity.x = -5;
	  }
	
	  

	wall1.x = 10;
	wall1.y = 500;
	wall1.h = 1000;

	wall2.x = 990;
	wall2.y = 500;
	wall2.h = 1000;

	wall3.x = 500;
	wall3.y = 1;
	wall3.width = 1000;

	if (ball.position.y > height) {
		textSize(32);
		textAlign(CENTER, CENTER);
		fill(255, 0, 0);
		text("Game Over", width / 2, height / 2);
		noLoop();
	  }
	
	  if (bricks.length === 0) {
		textSize(32);
		textAlign(CENTER, CENTER);
		fill(0, 255, 0);
		text("You Win!", width / 2, height / 2);
		noLoop();
	  }
}
