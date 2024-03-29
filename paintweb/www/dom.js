class MyLineStyle {

    constructor(width, color){
        this.width = width
        this.color = color
    }
}

class MyLine {
    constructor(point1, point2, lineStyle) {
        this.pt1 = point1
        this.pt2 = point2
        this.lineStyle = lineStyle
    }

    onpaintShape(ctx){
        let lineStyle = this.lineStyle

        ctx.lineWidth = lineStyle.lineWidth
        ctx.strokeStyle = lineStyle.color
        ctx.beginPath()
        ctx.moveTo(this.pt1.x, this.pt1.y)
        ctx.lineTo(this.pt2.x, this.pt2.y)

        ctx.stroke()
    }
}

class MyRect {
    constructor(r, lineStyle) {
        this.x = r.x
        this.y = r.y
        this.width = r.width
        this.height = r.height
        this.lineStyle = lineStyle
    }

    onpaintShape(ctx) {
        let lineStyle = this.lineStyle
        ctx.lineWidth = lineStyle.width
        ctx.strokeStyle = lineStyle.color
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.stroke()
    }
}

class MyEllipse {
    constructor(x, y, radiusX, radiusY, lineStyle) {
        this.x = x
        this.y = y
        this.radiusX = radiusX
        this.radiusY = radiusY
        this.lineStyle = lineStyle
    }

    onpaintShape(ctx) {
        let lineStyle = this.lineStyle
        ctx.lineWidth = lineStyle.width
        ctx.strokeStyle = lineStyle.color
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI)
        ctx.stroke()
    }
}

class MyPath {
    constructor(points, close, lineStyle) {
        this.points = points
        this.close = close
        this.lineStyle = lineStyle
    }

    onpaintShape(ctx) {
        let n = this.points.length
        if (n < 1) {
            return
        }
        let points = this.points
        let lineStyle = this.lineStyle
        ctx.lineWidth = lineStyle.width
        ctx.strokeStyle = lineStyle.color
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < n; i++) {
            ctx.lineTo(points[i].x, points[i].y)
        }
        if (this.close) {
            ctx.closePath()
        }
        ctx.stroke()
    }
}

class MyPaintDoc {
    constructor(){
        this.shapes = []
    }

    addShape(shape) {
        if(shape != null){
            this.shapes.push(shape)
        }
    }

    onpaintDoc(ctx) {
        let shapes = this.shapes
        for(let i in shapes) {
            shapes[i].onpaintShape(ctx)
        }
    }
}