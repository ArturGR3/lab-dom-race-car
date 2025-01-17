class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.ScoreScreen = document.getElementById("score");
    this.livesScreen = document.getElementById("lives");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId; // a variable used to store the id of the interval running the game loop. We store and use this id to clear the interval once the game is over.
    this.gameLoopFrecuency = Math.floor(1000 / 60); //- a number that indicates the interval in milliseconds at which the game loop will execute. A good value for most screens is 1000/60, which equates to the the game being updated every ~17 millisecond, or about 60 times per second (60fps).
  }
  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "flex";
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrecuency);
  }
  gameLoop() {
    // console.log("dasda");
    this.update();
    if (this.gameIsOver) clearInterval(this.gameIntervalId);
  }
  update() {
    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
        this.livesScreen.innerText = this.lives;
        i--;
      } else if (obstacle.top > this.height) {
        this.score++;
        this.ScoreScreen.innerText = this.score;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }

    if (this.lives === 0) {
      this.endGame();
    }
    console.log(`cars ${this.obstacles.length}`);
    if (Math.random() > 0.9 && this.obstacles.length < 1) {
      console.log(`new cars ${this.obstacles.length}`);
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }
  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
