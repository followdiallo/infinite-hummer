import Rocket from "./rocket";
import Asteroid from "./asteroid";
import Wad from "web-audio-daw";

export default class Game {
  constructor() {
    this.lastTime = 0;
    this.rocket = new Rocket(this);
    this.gameObjects = [this.rocket];
    this.started = false;
    this.voice = new Wad({ source: "mic" });
    this.tuner = new Wad.Poly();
    this.lastNote = [];
  }

  logPitch = () => {
    if (
      this.tuner.pitch &&
      this.tuner.pitch !== this.lastNote[this.lastNote.length - 1]
    ) {
      if (this.tuner.pitch > this.lastNote[this.lastNote.length - 1]) {
        this.rocket.moveUp();
      } else {
        this.rocket.moveDown();
      }
      this.lastNote.push(this.tuner.pitch);
    }
    requestAnimationFrame(this.logPitch);
  };

  generateAsteroids() {
    if (this.started) {
      this.rocket = new Rocket(this);
      const asteroid1 = new Asteroid(Math.floor(Math.random() * 160), this);
      const asteroid2 = new Asteroid(Math.floor(Math.random() * 160), this);
      asteroid1.left = 550;
      asteroid2.left = 700;
      this.gameObjects = [this.rocket, asteroid1, asteroid2];
      setInterval(() => {
        this.gameObjects.push(
          new Asteroid(Math.floor(Math.random() * 160), this)
        );
      }, 3000);
    }
  }

  start() {
    if (!this.started) {
      this.started = true;
      this.tuner.add(this.voice);
      this.tuner.setVolume(0);
      this.voice.play();
      this.tuner.updatePitch();
      this.generateAsteroids();
      this.logPitch();
    }
  }

  stop = () => {
    this.voice.stop();
    this.tuner.stopUpdatingPitch();
  };

  updateParts(time) {
    this.gameObjects = this.gameObjects.filter(o => {
      return o.continueRendering;
    });
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
