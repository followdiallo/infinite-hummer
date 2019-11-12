// import React from "react";

// export const Rocket = props => {
//   const style = {
//     top: `${props.top}%`,
//     left: 20
//   };

//   return <div className="rocket" style={style}></div>;
// };

export default class Rocket {
  constructor(game) {
    this.game = game;
    this.altitude = 100;
    this.spareMeFromDeletion = true;
  }

  moveUp() {
    if (this.altitude > 0) {
      this.altitude -= 5;
    }
  }

  moveDown() {
    if (this.altitude < 180) {
      this.altitude += 5;
    }
  }

  draw(context) {
    context.fillStyle = "red";
    context.fillRect(20, this.altitude, 40, 20);
  }

  update(time) {
    if (!time) return;
    if (this.altitude < 180) {
      this.altitude++;
    }
    if (this.altitude === 180) {
      this.spareMeFromDeletion = false;
    }
  }
}
