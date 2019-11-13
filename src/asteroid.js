export default class Asteroid {
  constructor(top, game, speed = 25, width = 40, height = 40) {
    this.game = game;
    this.top = top;
    this.speed = speed;
    this.left = 800;
    this.width = width;
    this.height = height;
    this.continueRendering = true;
  }

  draw(context) {
    context.fillStyle = "white";
    context.fillRect(this.left, this.top, this.width, this.height);
  }

  update(time) {
    if (!time) {
      return;
    }
    this.left -= this.speed / time;
    if (
      (this.left <= 60 && this.left > 20) ||
      (this.left + this.width <= 60 && this.left + this.width > 20)
    ) {
      if (
        (this.game.rocket.altitude - 20 >= this.top &&
          this.game.rocket.altitude <= this.top + this.height) ||
        (this.game.rocket.altitude + 20 >= this.top &&
          this.game.rocket.altitude + 20 <= this.top + this.height)
      ) {
        this.game.rocket.continueRendering = false;
      }
    }
    if (this.left < -(this.width + 10)) {
      this.continueRendering = false;
    }
  }
}
