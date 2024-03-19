export class UI {
	constructor(game) {
		this.game = game;
		this.fontSize = 50;
		this.fontFamily = "Protest Guerrilla";
	}
	draw(context) {
		context.save();
		context.shadowOffsetX = 5;
		context.shadowOffsetY = 5;
		context.shadowColor = "aqua";
		context.shadowBlur = 5;
		if (this.game.gameOver && !this.game.wainingToStart) {
			context.textAlign = "center";
			context.fillStyle = "red";
			context.font = this.fontSize * 2 + "px " + this.fontFamily;
			context.fillText("Game Over!", this.game.width * 0.5, this.game.height * 0.5 - 20);
			context.fillText(`Your score was: ${this.game.score.score}`, this.game.width * 0.5, this.game.height * 0.5 - 20 + 100);
		}
		if (this.game.wainingToStart) {
			context.textAlign = "center";
			context.fillStyle = "white";
			context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
			context.fillText("Waiting to Start, Press Space to Start!", this.game.width * 0.5, this.game.height * 0.5 - 20);
		}
		context.restore();
	}
}
