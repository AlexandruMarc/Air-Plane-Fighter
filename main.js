import { Player } from "./src/player.js";
import { Background } from "./src/background.js";
import { Projectile } from "./src/projectiles.js";
import { Asteroid } from "./src/enemies.js";
import { UI } from "./src/UI.js";
import { Score } from "./src/Score.js";

window.addEventListener("load", function () {
	const canvas = document.getElementById("canvas1");
	const ctx = canvas.getContext("2d");
	canvas.width = 1440;
	canvas.height = 1100;

	ctx.fillStyle = "red";
	ctx.font = "50px Helvetica";
	ctx.textAlign = "center";

	class Game {
		constructor(width, height) {
			this.width = width;
			this.height = height;
			this.player = new Player(this);
			this.background = new Background(this);
			this.UI = new UI(this);
			this.score = new Score(this);

			//Projectiles
			this.projectilesPool = [];
			this.numberOfProjectiles = 15;
			this.createProjecties();
			this.fired = false;

			//Enemies
			this.enemies = [];
			this.enemyTimer = 0;
			this.enemyInterval = Math.floor(Math.random() * 1100) + 500;

			//Speed of the game/ debug / game Over
			this.speed = 1;
			this.hpAsteroid = false;
			this.debug = false;
			this.gameOver = false;
			this.wainingToStart = true;
			this.hasAdedEventListenerForRestart = false;

			//Handle inputs
			this.keys = [];
			window.addEventListener("keydown", e => {
				if (e.key === " " && !this.fired) this.player.shoot();
				this.fired = true;
				if (this.keys.indexOf(e.key) === -1) {
					this.keys.push(e.key);
				}
				if (e.key === "d") this.debug = !this.debug;
				if (e.key === "Enter") this.hpAsteroid = !this.hpAsteroid;
			});

			window.addEventListener("keyup", e => {
				this.fired = false;
				const index = this.keys.indexOf(e.key);
				if (index > -1) {
					this.keys.splice(index, 1);
				}
			});
		}
		render(context, deltaTime) {
			this.background.update();
			this.background.draw(context);
			this.player.update();
			this.player.draw(context);
			if (this.enemyTimer > this.enemyInterval) {
				this.addEnemy();
				this.enemyTimer = 0;
			} else {
				this.enemyTimer += deltaTime + this.speed;
			}
			this.enemies.forEach(enemy => {
				enemy.update(deltaTime);
				enemy.draw(context);
			});
			this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
			this.projectilesPool.forEach(projectile => {
				projectile.draw(context);
				projectile.update();
			});
			this.UI.draw(context);
			this.score.draw(context);
		}

		//Creates the projectiles object pool
		createProjecties() {
			for (let i = 0; i < this.numberOfProjectiles; i++) {
				this.projectilesPool.push(new Projectile(this));
			}
		}
		//Get free projectiles object from the pool
		getProjectile() {
			for (let i = 0; i < this.projectilesPool.length; i++) {
				if (this.projectilesPool[i].free) {
					return this.projectilesPool[i];
				}
			}
		}
		addEnemy() {
			this.enemies.push(new Asteroid(this));
		}
		checkCollisions(a, b) {
			const dx = a.x - b.x;
			const dy = a.y - b.y;
			const distance = Math.hypot(dx, dy);
			const sumOfRadii = a.radius + b.radius;
			return distance < sumOfRadii;
		}
	}

	const game = new Game(canvas.width, canvas.height);

	function reset() {
		game.background.reset();
		game.player.reset();
		game.projectilesPool.forEach(projectile => projectile.reset());
		game.enemies = [];
		game.enemyTimer = 0;
		game.enemyInterval = Math.floor(Math.random() * 1100) + 500;
		game.speed = 1;
		game.gameOver = false;
		game.wainingToStart = false;
		game.hasAdedEventListenerForRestart = false;
		game.score.reset();
	}

	function setupGameForReset() {
		if (!game.hasAdedEventListenerForRestart) {
			game.hasAdedEventListenerForRestart = true;

			setTimeout(() => {
				game.wainingToStart = true;
				displayMassage();
			}, 8000);
		}
	}

	function displayMassage() {
		window.addEventListener(
			"keydown",
			e => {
				if (e.key === " ") {
					reset();
				} else {
					displayMassage();
				}
			},
			{ once: true }
		);
	}

	function drawAfterGameOver(deltaTime) {
		game.background.draw(ctx);
		game.player.draw(ctx);
		game.enemies.forEach(enemy => {
			enemy.draw(ctx);
		});
		game.UI.draw(ctx);
		game.score.draw(ctx);
		game.score.setHighScore();
	}

	let lastTime = 0;
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (!game.gameOver && !game.wainingToStart) {
			game.render(ctx, deltaTime);
		} else {
			let hasRun = false;
			if (!hasRun) {
				game.enemies.forEach(enemy => enemy.update(deltaTime));
				hasRun = true;
			}
			drawAfterGameOver(deltaTime);
			setupGameForReset();
		}
		requestAnimationFrame(animate);
	}

	animate(0);
});
