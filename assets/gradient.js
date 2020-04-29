// Default animation
const Animation = {
  duration: 10000,
  interval: 10,
  stepUnit: 1.0,
  currUnit: 0.0,
};

// Gradient
class Gradient {
  constructor(context, width, height, animation = Animation) {
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.animation = animation;
    this.colorStops = [];
    this.currentStop = 0;
  }

  addStop(pos, colors) {
    const stop = {
      pos,
      colors,
      currColor: null,
    };

    this.colorStops.push(stop);
  }

  // interpolate colors of stops
  updateStops() {
    const steps = this.animation.duration / this.animation.interval,
      step_u = this.animation.stepUnit / steps,
      stopsLength = this.colorStops[0].colors.length - 1;

    for (let stop of this.colorStops) {
      const startColor = stop.colors[this.currentStop];

      let endColor;

      // get stop 2 color, go to first if at last stop
      if (this.currentStop < stopsLength) {
        endColor = stop.colors[this.currentStop + 1];
      } else {
        endColor = stop.colors[0];
      }

      //interpolate both stop 1&2 colors to get new color based on animaiton unit
      const r = Math.floor(
        lerp(startColor.r, endColor.r, this.animation.currUnit)
      );
      const g = Math.floor(
        lerp(startColor.g, endColor.g, this.animation.currUnit)
      );
      const b = Math.floor(
        lerp(startColor.b, endColor.b, this.animation.currUnit)
      );

      stop.currColor = `rgb(${r}, ${g}, ${b})`;
    }

    // update current stop and animation units if interpolaiton is complete
    if (this.animation.currUnit >= 1.0) {
      this.animation.currUnit = 0;

      if (this.currentStop < stopsLength) {
        this.currentStop++;
      } else {
        this.currentStop = 0;
      }
    }

    // increment animation unit
    this.animation.currUnit += step_u;
  }

  updateSize(width, height) {
    this.width = width;
    this.height = height;
  }

  draw() {
    const g = this.ctx.createLinearGradient(0, this.width, this.height, 0);

    for (let stop of this.colorStops) {
      const { pos, currColor: color } = stop;

      g.addColorStop(pos, color);
    }

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = g;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
