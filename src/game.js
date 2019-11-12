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
      //console.log(this.tuner.pitch, this.tuner.noteName);
      const noteHistory = Array.from(this.lastNote);
      noteHistory.push(this.tuner.pitch);
      if (this.tuner.pitch > this.lastNote[this.lastNote.length - 1]) {
        this.rocket.moveUp();
      } else {
        this.rocket.moveDown();
      }
      this.lastNote = noteHistory;
    }
    requestAnimationFrame(this.logPitch);
  };

  generateAsteroids() {
    if (this.started) {
      const asteroid1 = new Asteroid(Math.floor(Math.random() * 160), this);
      const asteroid2 = new Asteroid(Math.floor(Math.random() * 160), this);
      asteroid1.left = 550;
      asteroid2.left = 700;
      this.gameObjects.push(asteroid1, asteroid2);
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
      return o.spareMeFromDeletion;
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
