class Layer {
	constructor(game, width, height, image, imageFliped) {
		this.game = game;
		this.width = width;
		this.height = height;
		this.image = image;
		this.imageFliped = imageFliped;
		this.x = 0;
		this.y = this.height;
		this.y2 = this.y - this.height;
	}
	update() {
		this.speed = this.game.speed;
		if (this.y > +this.height) this.y = this.y2 - this.height + this.speed;
		if (this.y2 > +this.height) this.y2 = this.y - this.height + this.speed;
		this.y += this.speed;
		this.y2 += this.speed;
	}
	draw(context) {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
		context.drawImage(this.imageFliped, this.x, this.y2 + 1, this.width, this.height);
	}
	reset() {
		this.x = 0;
		this.y = this.height;
		this.y2 = this.y - this.height;
	}
}

export class Background {
	constructor(game) {
		this.game = game;
		this.width = 1440;
		this.height = 2560;
		this.background = background;
		this.backgroundFliped = background_fliped;
		this.layer = new Layer(this.game, this.width, this.height, this.background, this.backgroundFliped);
	}
	update() {
		this.layer.update();
	}
	draw(context) {
		this.layer.draw(context);
	}
	reset() {
		this.layer.reset();
	}
}
