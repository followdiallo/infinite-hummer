import React from "react";
import Game from "./game";
import Rocket from "./rocket";
import Asteroid from "./asteroid";

class GameCanvas extends React.Component {
  constructor() {
    super();
    this.game = new Game();
    this.showStartButton = true;
    this.state = {
      score: 0
    };
  }

  componentDidMount() {
    this.game.stop();
  }

  letsBegin = () => {
    if (this.showStartButton) {
      this.game.start();
      this.gameLoop();
      this.showStartButton = false;
    }
  };

  gameLoop = timestamp => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    let deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    if (!this.game.gameObjects.includes(this.game.rocket)) {
      this.game.started = false;
    }
    ctx.clearRect(0, 0, 800, 200);
    this.game.updateParts(deltaTime);
    this.game.drawCanvas(ctx);
    if (this.game.started) {
      const newScore = this.state.score + 1;
      this.setState({ score: newScore });
    }
    requestAnimationFrame(this.gameLoop);
  };

  restart = () => {
    if (!this.showStartButton) {
      this.setState({ score: 0 });
      this.game.rocket = new Rocket(this.game);
      const asteroid1 = new Asteroid(
        Math.floor(Math.random() * 160),
        this.game
      );
      const asteroid2 = new Asteroid(
        Math.floor(Math.random() * 160),
        this.game
      );
      asteroid1.left = 550;
      asteroid2.left = 700;
      this.game.gameObjects = [this.game.rocket, asteroid1, asteroid2];
      this.game.started = true;
    }
  };

  render() {
    return (
      <div>
        <canvas className="canvas" ref="canvas" width={800} height={200} />
        <h2 className="score">
          Score: {this.state.score ? this.state.score : null}
        </h2>
        <div>
          {this.showStartButton ? (
            <button onClick={this.letsBegin}>START</button>
          ) : (
            <button onClick={this.restart}>RESTART</button>
          )}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="gradient-text">INFINITE HUMMER</h1>
        <GameCanvas />
        <p>Hum a rising tone to move the piece up.</p>
        <p>Hum a falling tone to move the piece down.</p>
        <p>Avoid the obstacles! Don't hit the bottom!</p>
        <a href="https://github.com/followdiallo/infinite-hummer">
          <img
            id="github"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
        </a>
      </div>
    );
  }
}

export default App;
