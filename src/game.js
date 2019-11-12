import Rocket from "./rocket";
import Asteroid from "./asteroid";

export default class Game {
  constructor() {
    this.lastTime = 0;
    this.rocket = new Rocket(this);
    this.gameObjects = [this.rocket];
    this.started = false;
  }

  generateAsteroids() {
    setInterval(() => {
      this.gameObjects.push(
        new Asteroid(Math.floor(Math.random() * 160), this)
      );
    }, 3000);
  }

  updateParts(time) {
    this.gameObjects = this.gameObjects.filter(o => {
      return o.spareMeFromDeletion;
    });
    console.log(this.gameObjects);
    for (const p of this.gameObjects) {
      p.update(time);
    }
  }

  drawCanvas(context) {
    for (const o of this.gameObjects) {
      o.draw(context);
    }
  }
}
