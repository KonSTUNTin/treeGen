import canvas from './canvas.js';
import Canvas from './canvas.js';
class Tree {
    constructor() {
        this.points = [];
        this.segments = [];
        this.mainPoints = [];
        this.leaves = [];
        this.image = new Image();
        this.image.src = '../images/image.png';

    }
    grow(x, y) {
        let index = this.points.length;
        let index0 = this.mainPoints.length - 1;
        let parentIndex = this.mainPoints[index0];
        this.mainPoints.push(index);
        let dx = 0;
        let dy = 0;
        let l = 0;
        let sprite = null;
        let weight = 200;
        if (index>0) {
            dx = x - this.points[parentIndex].x;
            dy = y - this.points[parentIndex].y;
            l =  Math.sqrt(dx * dx + dy * dy);
            weight = weight / (this.mainPoints.length + 1);
            let canvas = new Canvas(l, weight, false);
            canvas.ctx.drawImage(
                this.image,
                (this.image.width - l) * Math.random(),
                (this.image.height - weight) * Math.random(),
                l,
                weight,
                0,
                0,
                l,
                weight

            );
            sprite = canvas.canvas
        }
        this.points.push({
            x: x,
            y: y,
            weight: weight,
            childs: 0,
            l: l,
            a: Math.atan2(dy, dx),
            parent: parentIndex,
            image: sprite
        });
        
            
        
        let num = this.points.length
        for (let i = 0; i < num; i++) {
            let index2 = Math.ceil(Math.random() * (this.points.length - 1));
            if(index2==0) return
            let parent = this.points[index2];
            if (this.points[index2].childs < 7) {
                let a = - Math.PI / 2 + Math.cos(Math.random() * Math.PI * 2) * Math.PI / 4;
                let ll = Math.random() * parent.l * 0.6 + 0.4 * parent.l;
                let nx = Math.cos(a) * l + parent.x;
                let ny = Math.sin(a) * l + parent.y;
                let dx = nx - parent.x;
                let dy = ny - parent.y;
                let weight2 = parent.weight / 2;
                let canvas2 = new Canvas(ll, weight2, false);
                canvas2.ctx.drawImage(
                    this.image,
                    (this.image.width - ll) * Math.random(),
                    (this.image.height - weight2) * Math.random(),
                    ll,
                    weight2,
                    0,
                    0,
                    ll,
                    weight2
                );

                this.points.push({
                    x: nx,
                    y: ny,
                    weight: weight2,
                    childs: 5,
                    parent: index2,
                    a: Math.atan2(dy, dx),
                    l: ll,
                    image: canvas2.canvas
                });
                
                parent.childs += 1
            }

        }
    }
    draw(canvas) {
        let ctx = canvas.ctx
        ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
        ctx.lineWidth = 1;
        for (let i = 0; i < this.points.length; i++) {
            if(i>0){
                ctx.save();
                ctx.translate(this.points[i].x,this.points[i].y);
                ctx.rotate(this.points[i].a + Math.PI );
                ctx.drawImage(
                    this.points[i].image,
                    -this.points[i].weight / 2,
                    -this.points[i].weight / 2
                )
                ctx.restore()
            }
           
        }
        
    }
    move(time) {
        for (let i = 1; i < this.points.length; i++) {

            let parent = this.points[this.points[i].parent]
            this.points[i].a += Math.cos(time / 200 + i + this.points[i].x / 1024 * 17) * Math.PI / 8000;
            this.points[i].x = Math.cos(this.points[i].a) * this.points[i].l + parent.x
            this.points[i].y = Math.sin(this.points[i].a) * this.points[i].l + parent.y


        }
    }
}

export default Tree