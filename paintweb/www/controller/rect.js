
function normalizeRect(rect) {
    let x = rect.p1.x
    let y = rect.p1.y
    let width = rect.p2.x - x
    let height = rect.p2.y - y
    if (width < 0) {
        x = rect.p2.x
        width = -width
    }
    if (height < 0) {
        y = rect.p2.y
        height = -height
    }
    return {x: x, y: y, width: width, height: height}
}

class MyRectCreator {
    constructor(shapeType) {
        this.shapeType = shapeType
        this.rect = {
            p1: {x: 0, y: 0},
            p2: {x: 0, y: 0}
        }
        this.started = false
        let ctrl = this
        myView.onmousedown = function(event) { ctrl.onmousedown(event) }
        myView.onmousemove = function(event) { ctrl.onmousemove(event) }
        myView.onmouseup = function(event) { ctrl.onmouseup(event) }
        myView.onkeydown = function(event) { ctrl.onkeydown(event) }
    }
    stop() {
        myView.onmousedown = null
        myView.onmousemove = null
        myView.onmouseup = null
        myView.onkeydown = null
    }

    reset() {
        this.started = false
        invalidate(this.rect)
    }
    buildShape() {
        let rect = this.rect
        let r = normalizeRect(rect)
        switch (this.shapeType) {
        case "line":
            return new MyLine(rect.p1, rect.p2, myView.lineStyle)
        case "rect":
            return new MyRect(r, myView.lineStyle)
        case "ellipse":
            let rx = r.width / 2
            let ry = r.height / 2
            return new MyEllipse(r.x + rx, r.y + ry, rx, ry, myView.lineStyle)
        case "circle":
            let rc = Math.sqrt(r.width * r.width + r.height * r.height)
            return new MyEllipse(rect.p1.x, rect.p1.y, rc, rc, myView.lineStyle)
        default:
            alert("unknown shapeType: " + this.shapeType)
            return null
        }
    }

    onmousedown(event) {
        this.rect.p1 = myView.getMousePos(event)
        this.started = true
    }
    onmousemove(event) {
        if (this.started) {
            this.rect.p2 = myView.getMousePos(event)
            invalidate(this.rect)
        }
    }
    onmouseup(event) {
        if (this.started) {
            this.rect.p2 = myView.getMousePos(event)
            myView.doc.addShape(this.buildShape())
            this.reset()
        }
    }
    onkeydown(event) {
        if (event.keyCode == 27) { // keyEsc
            this.reset()
        }
    }

    onpaintComp(ctx) {
        if (this.started) {
            this.buildShape().onpaintShape(ctx)
        }
    }
}

myView.registerController("LineCreator", function() {
    return new MyRectCreator("line")
})

myView.registerController("RectCreator", function() {
    return new MyRectCreator("rect")
})

myView.registerController("EllipseCreator", function() {
    return new MyRectCreator("ellipse")
})

myView.registerController("CircleCreator", function() {
    return new MyRectCreator("circle")
})
