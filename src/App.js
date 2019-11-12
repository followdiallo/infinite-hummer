// import React, { Component } from "react";
// import { Rocket } from "./rocket";
// import AsteroidBelt from "./asteroidBelt";
// import Wad from "web-audio-daw";

// class App extends Component {
//   constructor() {
//     super();
//     this.voice = new Wad({ source: "mic" });
//     this.tuner = new Wad.Poly();
//     this.tuner.add(this.voice);
//     this.voice.play();
//     this.tuner.updatePitch();
//     this.state = {
//       altitude: 50,
//       lastNote: [],
//       asteroids: [0, 100]
//     };
//   }

//   moveAsteroids = () => {
//     //console.log(this.state.asteroids);
//       const newAsteroids = Array.from(this.state.asteroids);
//       const newAsteroids2 = newAsteroids.filter(a => {
//         return a >= 0;
//       });
//       for (let i = 0; i < newAsteroids2.length; i++) {
//         newAsteroids2[i]--;
//       }
//       // const newAsteroids3 = newAsteroids2.map(a => {
//       //   return a--;
//       // });
//       this.setState({ asteroids: newAsteroids2 });
//       console.log(this.state.asteroids);
//   };

//   moveUp() {
//     if (this.state.altitude > 0) {
//       const newAltitude = this.state.altitude - 3;
//       this.setState({ altitude: newAltitude });
//     }
//   }

//   moveDown() {
//     if (this.state.altitude < 90) {
//       const newAltitude = this.state.altitude + 3;
//       this.setState({ altitude: newAltitude });
//     }
//   }

//   logPitch = () => {
//     if (
//       this.tuner.pitch &&
//       this.tuner.pitch !== this.state.lastNote[this.state.lastNote.length - 1]
//     ) {
//       //console.log(this.tuner.pitch, this.tuner.noteName);
//       const noteHistory = Array.from(this.state.lastNote);
//       noteHistory.push(this.tuner.pitch);
//       if (
//         this.tuner.pitch > this.state.lastNote[this.state.lastNote.length - 1]
//       ) {
//         this.moveUp();
//       } else {
//         this.moveDown();
//       }
//       this.setState({ lastNote: noteHistory });
//       console.log(this.state.altitude);
//     }
//     this.moveAsteroids();
//     requestAnimationFrame(this.logPitch);
//   };

//   begin = () => {
//     this.voice.play();
//     this.logPitch();
//   };

//   stop = () => {
//     this.voice.stop();
//     this.tuner.stopUpdatingPitch();
//   };

//   render() {
//     return (
//       <div>
//         <div className="game-area">
//           <Rocket top={this.state.altitude} />
//           <AsteroidBelt asteroids={this.state.asteroids} style={{ top: 0 }} />
//         </div>
//         <button onClick={this.begin}>BEGIN</button>
//         <button onClick={this.stop}>STOP</button>
//       </div>
//     );
//   }
// }

// export default App;

import React from "react";
import Game from "./game";

class GameCanvas extends React.Component {
  constructor() {
    super();
    this.game = new Game();
  }

  componentDidMount() {
    this.game.generateAsteroids();
  }

  componentDidUpdate() {
    this.gameLoop();
  }

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
    return <canvas className="canvas" ref="canvas" width={800} height={200} />;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <GameCanvas />
        <button onClick={() => this.setState({ started: true })}>
          LET'S START
        </button>
      </div>
    );
  }
}

export default App;
