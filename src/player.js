export class Player {
	constructor(game) {
		this.game = game;
		//Width and height of the caracter in the sprite sheet
		this.width = 185 / 1.2;
		this.height = 203 / 1.2;

		//His coordinates
		this.x = this.game.width / 2 - this.width / 2;
		this.y = this.game.height - this.height - 10;
		this.speed = 6;

		this.image = player;
	}
	update() {
		// Movement of the player
		if (this.game.keys.indexOf("ArrowLeft") > -1) {
			this.x -= this.speed;
		}
		if (this.game.keys.indexOf("ArrowRight") > -1) {
			this.x += this.speed;
		}
		// Boundories
		if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
		if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;
		this.collisionWithCircles();
	}
	collisionWithCircles() {
		// Calculate triangle coordinates
		this.triangleTopX = this.x + this.width / 2;
		this.triangleTopY = this.y;
		this.triangleLeftX = this.x - 10;
		this.triangleLeftY = this.y + this.height - 20;
		this.triangleRightX = this.x + this.width + 10;
		this.triangleRightY = this.y + this.height - 20;

		// Check for collisions with asteroids
		this.game.enemies.forEach(enemy => {
			// Calculate the distances from the enemy's center to each of the triangle's vertices(**2 is the eqation at the power of 2)
			const distanceToTop = Math.sqrt((enemy.x - this.triangleTopX) ** 2 + (enemy.y - this.triangleTopY) ** 2);
			const distanceToLeft = Math.sqrt((enemy.x - this.triangleLeftX) ** 2 + (enemy.y - this.triangleLeftY) ** 2);
			const distanceToRight = Math.sqrt((enemy.x - this.triangleRightX) ** 2 + (enemy.y - this.triangleRightY) ** 2);

			// Check if the sum of distances is less than or equal to the distance between the left and right vertices
			const triangleBase = Math.sqrt((this.triangleRightX - this.triangleLeftX) ** 2 + (this.triangleRightY - this.triangleLeftY) ** 2);

			// If the sum of distances is less than or equal to the length of the base,
			// the enemy is inside the triangle or touching it
			if (distanceToTop + distanceToLeft + distanceToRight <= triangleBase) {
				enemy.destroid = true;
				this.game.gameOver = true;
			} else {
				// Check if the enemy is within the radius of the triangle's vertices
				if (distanceToTop <= enemy.radius || distanceToLeft <= enemy.radius || distanceToRight <= enemy.radius) {
					enemy.destroid = true;
					this.game.gameOver = true;
				}
			}
		});
	}

	draw(context) {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
		if (this.game.debug) {
			context.beginPath();
			context.moveTo(this.triangleTopX, this.triangleTopY);
			context.lineTo(this.triangleLeftX, this.triangleLeftY);
			context.lineTo(this.triangleRightX, this.triangleRightY);
			context.closePath();
			context.strokeStyle = "red";
			context.stroke();
		}
	}
	shoot() {
		const projectiles = this.game.getProjectile();
		if (projectiles) projectiles.start(this.x + this.width * 0.5, this.y);
	}
	reset() {
		this.x = this.game.width / 2 - this.width / 2;
		this.y = this.game.height - this.height - 10;
	}
}
