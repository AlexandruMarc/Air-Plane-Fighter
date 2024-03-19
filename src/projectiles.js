export class Projectile {
	constructor(game) {
		this.game = game;
		this.width = 4;
		this.height = 40;
		this.x;
		this.y;
		this.radius = 10;
		this.speed = 7;
		this.free = true;
	}
	draw(context) {
		if (!this.free) {
			context.save();
			context.fillStyle = "gold";
			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			context.fill();
			context.restore();
		}
	}
	update() {
		if (!this.free) {
			this.y -= this.speed;
			if (this.y < -this.height) this.reset();
		}
	}
	start(x, y) {
		this.x = x - this.width * 0.5;
		this.y = y;
		this.free = false;
	}
	reset() {
		this.free = true;
	}
}
