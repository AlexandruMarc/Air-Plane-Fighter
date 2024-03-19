class Enemy {
	constructor(game) {
		this.game = game;
		this.markedForDeletion = false;
		this.sizeModifier = 1.7;
		this.radius = 65;
		this.fps = 10;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
		this.destroid = false;
	}
	update(deltaTime) {
		if (this.lives >= 1) this.y += this.speed;

		//Hadle sprite animation
		if (this.destroid) {
			if (this.frameTimer > this.frameInterval) {
				this.frameTimer = 0;
				if (this.frameX < this.maxFrame) this.frameX++;
				if (this.frameX > 6) this.markedForDeletion = true;
			} else {
				this.frameTimer += deltaTime;
			}
		}
		if (this.y > this.game.height + this.height) {
			this.markedForDeletion = true;
		}
		//check collision projectile and enemy
		this.game.projectilesPool.forEach(projectile => {
			if (!projectile.free && this.game.checkCollisions(this, projectile) && this.lives >= 1) {
				this.hit(1);
				projectile.reset();
			}
		});
	}
	draw(context) {
		context.drawImage(
			this.image,
			this.frameX * this.width,
			this.frameY * this.height,
			this.width,
			this.height,
			this.x - this.radius,
			this.y - this.radius,
			this.width * this.sizeModifier,
			this.height * this.sizeModifier
		);
		if (this.game.debug) {
			context.save();
			context.beginPath();
			context.strokeStyle = "red";
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			context.stroke();
			context.restore();
		}
		if (this.game.hpAsteroid && this.destroid === false) {
			context.save();
			context.fillStyle = "red";
			context.fillText(this.lives, this.x, this.y);
			context.restore();
		}
	}
	hit(damage) {
		this.lives -= damage;
		if (this.lives <= 0) {
			this.destroid = true;
			this.game.score.update();
		}
	}
}

export class Asteroid extends Enemy {
	constructor(game) {
		super(game);
		this.game = game;
		this.width = 80;
		this.height = 80;
		this.x = Math.floor(Math.random() * 1250) + 10;
		this.y = -this.game.height * 0.5;
		this.image = enemy;
		this.maxFrame = 7;
		this.frameX = 0;
		this.frameY = Math.floor(Math.random() * 4);
		this.speed = Math.random() < 0.5 ? 2 : 1.5;
		this.lives = Math.floor(Math.random() * 6);
	}
}
