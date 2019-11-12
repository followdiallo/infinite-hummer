import React from "react";

class Asteroid extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      top: `${props.top}`,
      left: 800
    };
    this.state = {
      spareMeFromDeletion: true
    };
  }

  render() {
    return <div className="asteroid" style={this.style}></div>;
  }
}

export default class AsteroidBelt extends React.Component {
  constructor(props) {
    super(props);
    this.asteroids = props.asteroids;
  }
  render() {
    return (
      <div className="asteroid-belt">
        {this.asteroids.map((a, i) => {
          return <Asteroid top={`${a}px`} key={i} />;
        })}
      </div>
    );
  }
}
