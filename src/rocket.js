// import React from "react";

// export const Rocket = props => {
//   const style = {
//     top: `${props.top}%`,
//     left: 20
//   };

//   return <div className="rocket" style={style}></div>;
// };

export default class Rocket {
  constructor() {
    this.altitude = 100;
    this.spareMeFromDeletion = true;
  }

  moveUp() {
    if (this.altitude > 0) {
      this.altitude -= 3;
    }
  }

  moveDown() {
    if (this.altitude < 200) {
      this.altitude += 3;
    }
  }

  draw(context) {
    context.fillStyle = "red";
    context.fillRect(20, this.altitude, 40, 20);
  }

  update(time) {
    if (!time) return;
  }
}
