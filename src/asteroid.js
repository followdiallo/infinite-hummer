export default class Asteroid {
  constructor(top) {
    this.top = top;
    this.left = 800;
    this.spareMeFromDeletion = true;
  }

  draw(context) {
    context.fillStyle = "white";
    context.fillRect(this.left, this.top, 40, 40);
  }

  update(time) {
    if (!time) {
      return;
    }
    this.left -= 15 / time;
    if (this.left < -50) {
      this.spareMeFromDeletion = false;
    }
  }
}
