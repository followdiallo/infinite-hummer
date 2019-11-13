export default class Asteroid {
  constructor(top, game) {
    this.game = game;
    this.top = top;
    this.left = 800;
    this.continueRendering = true;
  }

  draw(context) {
    context.fillStyle = "white";
    context.fillRect(this.left, this.top, 40, 40);
  }

  update(time) {
    if (!time) {
      return;
    }
    this.left -= 25 / time;
    if (
      (this.left <= 60 && this.left > 20) ||
      (this.left + 40 <= 60 && this.left + 40 > 20)
    ) {
      if (
        (this.game.rocket.altitude - 20 >= this.top &&
          this.game.rocket.altitude <= this.top + 40) ||
        (this.game.rocket.altitude + 20 >= this.top &&
          this.game.rocket.altitude + 20 <= this.top + 40)
      ) {
        this.game.rocket.continueRendering = false;
      }
    }
    if (this.left < -50) {
      this.continueRendering = false;
    }
  }
}
