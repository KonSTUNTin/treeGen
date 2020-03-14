import Canvas from './canvas.js';
import Tree from './tree.js'

let ctx;
let w = 1024
let tree;
let time = 0;

window.onload = function () {
    ctx = new Canvas(w);
    tree = new Tree();
    ctx.canvas.onclick = clickHandler

    animate();

}

function clickHandler(){
    let e = window.event;
    let x = e.clientX;
    let y = e.clientY;
    tree.grow(x, y)
    tree.draw(ctx)
}

function animate(){
    requestAnimationFrame(animate);
    tree.move(time)
    tree.draw(ctx)
    time++
}