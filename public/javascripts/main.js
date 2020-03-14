let ctx;
let w = 1024
let tree;

window.onload = function () {
    ctx = new Canvas(w);
    tree = new Tree();
    ctx.canvas.onclick = ()=>{
        let e = window.event;
        let x = e.clientX;
        let y = e.clientY;
        tree.grow(x, y)
        tree.draw(ctx)
    }

}

class Canvas {
    constructor(width) {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = width;
        document.body.appendChild(canvas);
        let context = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = context
    }
    
}
class Tree{
    constructor(){
        this.points = [];
        this.segments = [];
        this.mainPoints = [];
        
    }
    grow(x, y){
        let index = tree.points.length
        tree.points.push({
            x: x,
            y: y,
            weight: 3,
            childs: 0
        });
        tree.mainPoints.push(index)
        if (index > 0) {
            tree.segments.push({
                b: index,
                a: tree.mainPoints[tree.mainPoints.length - 2],
                weight: 3
            })
        }

        let num = Math.round(Math.random() * 20 + 1)
        for (let i = 0; i < num; i++) {
            let index = Math.ceil(Math.random() * (tree.points.length - 1));

            if (tree.points[index].childs < 7) {
                let a = -Math.PI / 2 + Math.cos(Math.random() * Math.PI * 2) * Math.PI / 2;
                let l = Math.random() * 60 + 40;
                let nx = Math.cos(a) * l + tree.points[index].x;
                let ny = Math.sin(a) * l + tree.points[index].y;
                tree.points.push({
                    x: nx,
                    y: ny,
                    weight: 1,
                    childs: 5
                });
                tree.segments.push({
                    b: tree.points.length - 1,
                    a: index,
                    weight: 1
                })
                tree.points[index].childs += 1
            }

        }
    }
    draw(canvas) {
        let ctx = canvas.ctx
        ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
        ctx.lineWidth = 1;
        for (let i = 0; i < this.points.length; i++) {
            
            ctx.beginPath();
            ctx.arc(
                this.points[i].x,
                this.points[i].y,
                this.points[i].weight * 5,
                0,
                Math.PI * 2
            )
            ctx.closePath();
            ctx.stroke()
        }
        for (let i = 0; i < this.segments.length; i++) {
            let a = this.segments[i].a;
            let b = this.segments[i].b;
            ctx.lineWidth = this.segments[i].weight;
            ctx.beginPath();
            ctx.moveTo(
                this.points[a].x,
                this.points[a].y,
            )
            ctx.lineTo(
                this.points[b].x,
                this.points[b].y,
            )
            ctx.closePath();
            ctx.stroke()
        }
    }
}