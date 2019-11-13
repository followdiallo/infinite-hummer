export default class Rocket {
  constructor(game) {
    this.game = game;
    this.altitude = 81;
    this.continueRendering = true;
  }

  moveUp() {
    if (this.altitude > 0) {
      this.altitude -= 5;
    }
  }

  moveDown() {
    this.altitude += 5;
    if (this.altitude >= 180) {
      this.continueRendering = false;
    }
  }

  draw(context) {
    context.fillStyle = "#58dbc1";
    context.fillRect(20, this.altitude, 40, 20);
  }

  update(time) {
    if (!time) return;
    if (this.altitude < 180) {
      this.altitude++;
    } else {
      this.continueRendering = false;
    }
  }
}
