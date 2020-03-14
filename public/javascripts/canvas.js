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
export default Canvas