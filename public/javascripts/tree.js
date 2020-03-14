class Tree {
    constructor() {
        this.points = [];
        this.segments = [];
        this.mainPoints = [];

    }
    grow(x, y) {
        let index = this.points.length;
        let index0 = this.mainPoints.length - 1;
        let parentIndex = this.mainPoints[index0];
        this.mainPoints.push(index);
        let dx = 0;
        let dy = 0;
        if (index>0) {
            dx = x - this.points[parentIndex].x;
            dy = y - this.points[parentIndex].y;
            this.segments.push({
                b: index,
                a: parentIndex,
                weight: 60 / this.mainPoints.length
            })
        }
        this.points.push({
            x: x,
            y: y,
            weight: 60 / (this.mainPoints.length + 1),
            childs: 0,
            l: Math.sqrt(dx * dx + dy * dy),
            a: Math.atan2(dy, dx),
            parent: parentIndex
        });
        
        let num = this.points.length
        for (let i = 0; i < num; i++) {
            let index2 = Math.ceil(Math.random() * (this.points.length - 1));
            if (this.points[index2].childs < 7) {
                let a = - Math.PI / 2 + Math.cos(Math.random() * Math.PI * 2) * Math.PI / 4;
                let l = Math.random() * 60 + 40;
                let nx = Math.cos(a) * l + this.points[index2].x;
                let ny = Math.sin(a) * l + this.points[index2].y;
                let dx = nx - this.points[index2].x;
                let dy = ny - this.points[index2].y;

                this.points.push({
                    x: nx,
                    y: ny,
                    weight: this.points[index2].weight / 2,
                    childs: 5,
                    parent: index2,
                    a: Math.atan2(dy, dx),
                    l: Math.sqrt(dx * dx + dy*  dy)
                });
                this.segments.push({
                    b: this.points.length - 1,
                    a: index2,
                    weight: this.points[index2].weight / 2
                })
                this.points[index2].childs += 1
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
                this.points[i].weight / 2,
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
    move(time) {
        for (let i = 1; i < this.points.length; i++) {

            let parent = this.points[this.points[i].parent]
            this.points[i].a += Math.cos(time / 200 + i / 80 * 17 + this.points[i].x / 1024 * 17) * Math.PI / 8000;
            this.points[i].x = Math.cos(this.points[i].a) * this.points[i].l + parent.x
            this.points[i].y = Math.sin(this.points[i].a) * this.points[i].l + parent.y


        }
    }
}

export default Tree