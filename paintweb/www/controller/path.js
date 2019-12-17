class MyPathCreator {
  constructor(close) {
    this.close = close;
    this.points = [];
    this.fromPos = this.toPos = { x: 0, y: 0 };
    this.started = false;
    let ctrl = this;

    myView.onmousedown = function(event) {
      ctrl.onmousedown(event);
    };
    myView.onmousemove = function(event) {
      ctrl.onmousemove(event);
    };
    myView.ondblclick = function(event) {
      ctrl.ondblclick(event);
    };
    myView.onkeydown = function(event) {
      ctrl.onkeydown(event);
    };
  }

  stop() {
    myView.onmousedown = null;
    myView.onmousemove = null;
    myView.ondblclick = null;
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
    this.toPos = myView.getMousePos(event);
    if (this.started) {
      this.points.push(this.toPos);
    } else {
      this.fromPos = this.toPos;
      this.started = true;
    }
    invalidate(null);
  }
  onmousemove(event) {
    if (this.started) {
      this.toPos = myView.getMousePos(event);
      invalidate(null);
    }
  }
  ondblclick(event) {
    if (this.started) {
      myView.doc.addShape(this.buildShape());
      this.reset();
    }
  }
  onkeydown(event) {
    switch (event.keyCode) {
      case 13: // keyEnter
        let n = this.points.length;
        if (n == 0 || this.points[n - 1] !== this.toPos) {
          this.points.push(this.toPos);
        }
        this.ondblclick(event);
        break;
      case 27: // keyEsc
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
      ctx.lineTo(this.toPos.x, this.toPos.y);
      if (this.close) {
        ctx.closePath();
      }
      ctx.stroke();
    }
  }
}

myView.registerController("PathCreator", function() {
  return new MyPathCreator(false);
});
