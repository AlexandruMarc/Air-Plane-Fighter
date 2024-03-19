export class Score {
	score = 0;
	HIGH_SCORE_KEY = "topScore";

	constructor(game) {
		this.game = game;
		this.fontSize = 50;
		this.fontFamily = "Protest Guerrilla";
	}

	update() {
		this.score++;
	}
	reset() {
		this.score = 0;
	}
	setHighScore() {
		const hightScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
		if (this.score > hightScore) {
			localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
		}
	}
	draw(context) {
		const hightScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));

		context.font = this.fontSize + "px " + this.fontFamily;
		context.fillStyle = "aqua";
		const scoreY = 100;
		const hightScoreY = scoreY + 80;

		const scorePadded = Math.floor(this.score);
		const hightScorePadded = hightScore.toString();

		context.fillText(`Score : ${scorePadded}`, 110, scoreY);
		context.fillText(`HI : ${hightScorePadded}`, 75, hightScoreY);
	}
}
