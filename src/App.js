import React from "react";
import Game from "./game";

class GameCanvas extends React.Component {
  constructor() {
    super();
    this.game = new Game();
  }

  letsBegin = () => {
    this.game.start();
    this.gameLoop();
  };

  gameLoop = timestamp => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    let deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    ctx.clearRect(0, 0, 800, 200);
    this.game.updateParts(deltaTime);
    this.game.drawCanvas(ctx);
    requestAnimationFrame(this.gameLoop);
  };

  render() {
    return (
      <div>
        <canvas className="canvas" ref="canvas" width={800} height={200} />
        <button onClick={() => this.letsBegin()}>START</button>
        {/* <button onClick={() => this.game.stop()}>STOP</button> */}
      </div>
    );
  }
}

class App extends React.Component {
  handleClick = () => {
    this.game.start();
    this.setState({ started: true });
  };

  render() {
    return (
      <div>
        <GameCanvas />
      </div>
    );
  }
}

export default App;
