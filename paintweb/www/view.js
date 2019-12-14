class MyPaintView {
  constructor() {
    this.properties = {
      lineWidth: 1,
      lineColor: "black"
    };
    this.controllers = {};
    this._currentKey = "";
    this._current = null;
    let drawing = document.getElementById("drawing");

    // this varaible view is used for following functions
    let view = this;
    // 函数式: 没有这个上下文，写这个就会痛苦
    drawing.onmousedown = function(event) {
      console.log("mouse down");
    };
    drawing.onmousemove = function(event) {
      //console.log("mouse move")
    };
    drawing.onmouseup = function(event) {
      console.log("mouse up");
    };
    drawing.ondblclick = function(event) {
      console.log("double click");
    };
    document.onkeydown = function(event) {
      console.log("key down");
    };
    this.drawing = drawing;
  } // constructor end


  // get mouse position
  getMousePos(event) {
    return {
      x: event.offsetX,
      y: event.offsetY
    };
  }
}

var myView = new MyPaintView();
