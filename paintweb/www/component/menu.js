// -----------------------
function installControllers() {
  document.getElementById("menu").innerHTML = `
    <input type="button" id="PathCreator" value="Create Path" style="visibility:visible">
    <input type="button" id="FreePathCreator" value="Create FreePath" style="visibility:visible">
    <input type="button" id="LineCreator" value="Create Line" style="visibility:visible">
    <input type="button" id="RectCreator" value="Create Rect" style="visibility:visible">
    <input type="button" id="EllipseCreator" value="Create Ellipse" style="visibility:visible">
    <input type="button" id="CircleCreator" value="Create Circle" style="visibility:visible">
  `;

  for (let gkey in myView.controllers) {
    let key = gkey;
    let elem = document.getElementById(key);
    elem.style.visibility = "visible";
    elem.onclick = function() {
      if (myView.currentKey != "") {
        document.getElementById(myView.currentKey).removeAttribute("style");
      }
      elem.style.borderColor = "blue";
      elem.blur();
      myView.activateController(key);
    };
  }
}

// -----------------------
// line width & color
function onLineWidthChanged() {
  let elem = document.getElementById("LineWidth");
  elem.blur;
  let val = parseInt(elem.value);
  if (val > 0) {
    myView.properties.lineWidth = val;
  }
}

function onLineColorChanged() {
  let elem = document.getElementById("LineColor");
  elem.blur();
  myView.properties.lineColor = elem.value;
}

function installProSelectors() {
  document.getElementById("menu").insertAdjacentHTML(
    "afterend",
    `<br><div id="properties">
    <label for="LineWidth">LineWidth: </label>
    <select id="LineWidth" onchange="onLineWidthChanged()">
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="7">7</option>
        <option value="9">9</option>
        <option value="11">11</option>
    </select>&nbsp;

    <label for="LineColor">LineColor: </label>
    <select id="LineColor" onchange="onLineColorChanged()">
        <option value="black">black</option>
        <option value="red">red</option>
        <option value="blue">blue</option>
        <option value="green">green</option>
        <option value="yellow">yellow</option>
        <option value="gray">gray</option>
    </select>
    </div>`
  );
}

// -----------------------
// mouse x,y
function installMousePosition() {
  document
    .getElementById("properties")
    .insertAdjacentHTML("beforeend", `&nbsp;<span id="mousepos"></span>`);

  let old = myView.drawing.onmousemove;
  let mousepos = document.getElementById("mousepos");

  myView.drawing.onmousemove = function(event) {
    let pos = myView.getMousePos(event);
    mousepos.innerText = "MousePos: " + pos.x + ", " + pos.y;
    old(event);
  };
}

// -----------------------
installControllers();
installProSelectors();
installMousePosition();
