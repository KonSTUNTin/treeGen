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
            segments: [],
            mainPoints: [],
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
        let index = obj.tree.points.length
        obj.tree.points.push({
            x: x,
            y: y,
            weight: 3,
            childs: 0
        });
        obj.tree.mainPoints.push(index)
        if (index > 0) {
            obj.tree.segments.push({
                b: index,
                a: obj.tree.mainPoints[obj.tree.mainPoints.length - 2],
                weight: 3
            })
        }

        let num = Math.round(Math.random() * 20 + 1)
        for (let i = 0; i < num; i++) {
            let index = Math.ceil(Math.random() * (obj.tree.points.length - 1));

            if (obj.tree.points[index].childs < 7) {
                let a = -Math.PI / 2 + Math.cos(Math.random() * Math.PI * 2) * Math.PI / 2;
                let l = Math.random() * 60 + 40;
                let nx = Math.cos(a) * l + obj.tree.points[index].x;
                let ny = Math.sin(a) * l + obj.tree.points[index].y;
                obj.tree.points.push({
                    x: nx,
                    y: ny,
                    weight: 1,
                    childs: 5
                });
                obj.tree.segments.push({
                    b: obj.tree.points.length - 1,
                    a: index,
                    weight: 1
                })
                obj.tree.points[index].childs += 1
            }

        }

        // if (obj.tree.points.length > 1) {
        //     let previousPoint = obj.tree.points[obj.tree.points.length - 2];
        //     let index = obj.tree.sprites.length
        //     let dx = x - previousPoint[0];
        //     let dy = y - previousPoint[1];
        //     let l = Math.sqrt(dx * dx + dy * dy);
        //     let angle = Math.atan2(dy, dx);
        //     let num = Math.round(Math.random() * 7 + 3);
        //     obj.tree.sprites[index] = []
        //     for (let i = 0; i < num; i++) {
        //         obj.tree.sprites[index].push({
        //             a: angle ,//+ Math.cos(Math.random() * Math.PI * 2) * Math.PI / 30,
        //             l: l * Math.random() * .3 + l * .7,
        //             x: previousPoint[0] + Math.cos(Math.random() * Math.PI * 2) * 10,
        //             y: previousPoint[1] + Math.cos(Math.random() * Math.PI * 2) * 10,
        //             w: Math.random() * 10 + 5
        //         })
        //     }

        // }

        obj.redraw(obj)
    }
    redraw(obj) {
        let ctx = obj.ctx
        ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height);
        ctx.lineWidth = 1;
        for (let i = 0; i < obj.tree.points.length; i++) {
            
            ctx.beginPath();
            ctx.arc(
                obj.tree.points[i].x,
                obj.tree.points[i].y,
                obj.tree.points[i].weight * 5,
                0,
                Math.PI * 2
            )
            ctx.closePath();
            ctx.stroke()
        }
        for (let i = 0; i < obj.tree.segments.length; i++) {
            let a = obj.tree.segments[i].a;
            let b = obj.tree.segments[i].b;
            ctx.lineWidth = obj.tree.segments[i].weight;
            ctx.beginPath();
            ctx.moveTo(
                obj.tree.points[a].x,
                obj.tree.points[a].y,
            )
            ctx.lineTo(
                obj.tree.points[b].x,
                obj.tree.points[b].y,
            )
            ctx.closePath();
            ctx.stroke()
        }
        // for (let i = 0; i < obj.tree.sprites.length; i++) {
        //     for (let j = 0; j < obj.tree.sprites[i].length; j++) {
        //         ctx.save();
        //         ctx.translate(
        //             obj.tree.sprites[i][j].x,
        //             obj.tree.sprites[i][j].y,
        //         )
        //         ctx.rotate(obj.tree.sprites[i][j].a)
        //         ctx.strokeRect(
        //             0,
        //             0,
        //             obj.tree.sprites[i][j].l,
        //             obj.tree.sprites[i][j].w,
        //         )
        //         ctx.restore()
        //     }
        // }


    }
}