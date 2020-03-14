let canvas, ctx;
let w = 1024

window.onload = function () {
    ctx = new Canvas(w);
    console.log(ctx)

}

class Canvas {
    constructor(width) {
        this.tree = {
            points: [],
            sprites: [],
            secondPoints:[],
        }
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = width;
        document.body.appendChild(canvas);
        let context = canvas.getContext('2d');
        this.canvas = canvas;
        this.canvas.onclick = () => this.onclick(this)
        this.ctx = context
    }
    onclick(obj) {
        let e = window.event;
        let x = e.clientX;
        let y = e.clientY;

        obj.tree.points.push([x, y]);
        if (obj.tree.points.length > 1) {
            let previousPoint = obj.tree.points[obj.tree.points.length - 2];
            let index = obj.tree.sprites.length
            let dx = x - previousPoint[0];
            let dy = y - previousPoint[1];
            let l = Math.sqrt(dx * dx + dy * dy);
            let angle = Math.atan2(dy, dx);
            let num = Math.round(Math.random() * 7 + 3);
            obj.tree.sprites[index] = []
            for (let i = 0; i < num; i++) {
               
                obj.tree.sprites[index].push({
                    a: angle ,//+ Math.cos(Math.random() * Math.PI * 2) * Math.PI / 30,
                    l: l * Math.random() * .3 + l * .7,
                    x: previousPoint[0] + Math.cos(Math.random() * Math.PI * 2) * 10,
                    y: previousPoint[1] + Math.cos(Math.random() * Math.PI * 2) * 10,
                    w: Math.random() * 10 + 5
                })
            }

        }

        obj.redraw(obj)
    }
    redraw(obj) {
        let ctx = obj.ctx
        ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height);
        for (let i = 0; i < obj.tree.points.length; i++) {
            ctx.beginPath();
            ctx.arc(
                obj.tree.points[i][0],
                obj.tree.points[i][1],
                20,
                0,
                Math.PI * 2
            )
            ctx.closePath();
            ctx.stroke()
        }
        for (let i = 0; i < obj.tree.sprites.length; i++) {
            for (let j = 0; j < obj.tree.sprites[i].length; j++) {
                ctx.save();
                ctx.translate(
                    obj.tree.sprites[i][j].x,
                    obj.tree.sprites[i][j].y,
                )
                ctx.rotate(obj.tree.sprites[i][j].a)
                ctx.strokeRect(
                    0,
                    0,
                    obj.tree.sprites[i][j].l,
                    obj.tree.sprites[i][j].w,
                )
                ctx.restore()
            }
        }


    }
}