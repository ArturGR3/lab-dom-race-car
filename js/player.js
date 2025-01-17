class Player {
  constructor(gameScreen, left, top, width, height, ImgSrc) {
    this.gameScreen = gameScreen;
    this.left = left; // the horizontal position of the car
    this.top = top; // the vertical position of the car
    this.width = width; // the width of the car element
    this.height = height; // the height of the car element
    this.directionX = 0; // initially set to 0. It is used to specify the horizontal movement direction and can have the following values: 0: not moving horizontally  1: moving horizontally to the right -1: moving horizontally to the left
    this.directionY = 0; // It is used to specify the vertical movement direction and can have the following values: 0: not moving vertically  1: moving vertically down -1: moving vertically up
    this.element = document.createElement("img"); // the image element representing the car. This image element should be created in the constructor using the provided image source (image url) passed as an argument to the constructor.
    this.element.src = ImgSrc;
    this.element.style.position = "absolute";
    // Set up the default element's property values
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.left += this.directionX;
    this.top += this.directionY;
    // Ensure the player's car stays within the game screen
    // handles left hand side
    if (this.left < 10) {
      this.left = 10;
    }

    // handles top side
    if (this.top < 10) {
      this.top = 10;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    // handles bottom side
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    // Update the player's car position on the screen
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
