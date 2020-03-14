class Canvas {
    constructor(width, height, boolean) {
        width = Math.round(width);
        height = Math.round(height)
        if(width<1){
            width = 1
        }  
        if(height<1){
            height=1
        }
        
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        if(boolean)document.body.appendChild(canvas);
        let context = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = context
    }
    
}
export default Canvas