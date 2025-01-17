window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  startButton.addEventListener("click", function () {
    console.log("start game");
    startGame();
  });

  const possibleKeyStrokes = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
  ];

  document.onkeydown = function (e) {
    if (possibleKeyStrokes.includes(e.key)) {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  };

  document.onkeyup = function (e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      game.player.directionX = 0;
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      game.player.directionY = 0;
    }
  };
  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    restartGame();
  });

  function restartGame() {
    location.reload();
  }
};
