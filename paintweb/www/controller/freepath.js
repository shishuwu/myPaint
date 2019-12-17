class MyFreePathCreator {
  constructor() {
    this.points = [];
    this.fromPos = { x: 0, y: 0 };
    this.started = false;

    let ctrl = this;

    myView.onmousedown = function(event) {
      ctrl.onmousedown(event);
    };

    myView.onmousemove = function(event) {
      ctrl.onmousemove(event);
    };

    myView.onmouseup = function(event) {
      ctrl.onmouseup(event);
    };

    myView.onkeydown = function(event) {
      ctrl.onkeydown(event);
    };
  }

  stop() {
    myView.onmousedown = null;
    myView.onmousemove = null;
    myView.onmouseup = null;
    myView.onkeydown = null;
  }

  reset() {
    this.points = [];
    this.started = false;
    invalidate(null);
  }

  buildShape() {
    let points = [{ x: this.fromPos.x, y: this.fromPos.y }];
    for (let i in this.points) {
      points.push(this.points[i]);
    }
    return new MyPath(points, this.close, myView.lineStyle);
  }

  onmousedown(event) {
    this.fromPos = myView.getMousePos(event);
    this.started = true;
  }
  onmousemove(event) {
    if (this.started) {
      this.points.push(myView.getMousePos(event));
      invalidate(null);
    }
  }
  onmouseup(event) {
    if (this.started) {
      myView.doc.addShape(this.buildShape());
      this.reset();
    }
  }
  onkeydown(event) {
    if (event.keyCode == 27) {
      // keyEsc
      this.reset();
    }
  }

  onpaint(ctx) {
    if (this.started) {
      let props = myView.properties;
      ctx.lineWidth = props.lineWidth;
      ctx.strokeStyle = props.lineColor;
      ctx.beginPath();
      ctx.moveTo(this.fromPos.x, this.fromPos.y);
      for (let i in this.points) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
      ctx.stroke();
    }
  }
}

myView.registerController("FreePathCreator", function() {
  return new MyFreePathCreator();
});
