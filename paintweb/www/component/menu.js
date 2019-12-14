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
}

// -----------------------
installControllers();
