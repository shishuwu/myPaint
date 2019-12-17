class MyPaintView {
  constructor() {
    this.properties = {
      lineWidth: 1,
      lineColor: "black"
    };
    this.controllers = {};
    this._currentKey = "";
    this._current = null;

    this.onmousedown = null;
    this.onmousemove = null;
    this.onmouseup = null;
    this.ondblclick = null;
    this.onkeydown = null;

    let drawing = document.getElementById("drawing");

    // this varaible view is used for following functions
    let view = this;
    // 函数式: 没有这个上下文，写这个就会痛苦
    drawing.onmousedown = function(event) {
      console.log("mouse down");

      event.preventDefault();
      if (view.onmousedown != null) {
        view.onmousedown(event);
      }
    };
    drawing.onmousemove = function(event) {
      //console.log("mouse move")
      if (view.onmousemove != null) {
        view.onmousemove(event);
      }
    };
    drawing.onmouseup = function(event) {
      console.log("mouse up");
      if (view.onmouseup != null) {
        view.onmouseup(event);
      }
    };
    drawing.ondblclick = function(event) {
      console.log("double click");

      event.preventDefault();
      if (view.ondblclick != null) {
        view.ondblclick(event);
      }
    };
    document.onkeydown = function(event) {
      console.log("key down");
      switch (event.keyCode) {
        case 9:
        case 13:
        case 27:
          event.preventDefault();
      }
      if (view.onkeydown != null) {
        view.onkeydown(event);
      }
    };
    this.drawing = drawing;
    this.doc = new MyPaintDoc();
  } // constructor end

  get currentKey() {
    return this._currentKey;
  }
  get lineStyle() {
    let props = this.properties;
    return new MyLineStyle(props.lineWidth, props.lineColor);
  }

  onpaintView(ctx) {
    this.doc.onpaintDoc(ctx);
    if (this._current != null) {
      this._current.onpaintComp(ctx);
    }
  }

  invalidateRect(reserved) {
    let ctx = this.drawing.getContext("2d");
    let bound = this.drawing.getBoundingClientRect();
    ctx.clearRect(0, 0, bound.width, bound.height);
    this.onpaintView(ctx);
  }

  // get mouse position
  getMousePos(event) {
    return {
      x: event.offsetX,
      y: event.offsetY
    };
  }

  registerController(name, controller) {
    if (name in this.controllers) {
      alert("Controller exists: " + name);
    } else {
      this.controllers[name] = controller;
    }
  }
  
  activateController(name) {
    this.stopController();
    if (name in this.controllers) {
      let controller = this.controllers[name];
      this._setCurrent(name, controller());
    }
  }
  stopController() {
    if (this._current != null) {
      this._current.stop();
      this._setCurrent("", null);
    }
  }

  _setCurrent(name, ctrl) {
    this._current = ctrl;
    this._currentKey = name;
  }
}

var myView = new MyPaintView();
function invalidate(reserved) {
  myView.invalidateRect(null)
}