class Graphics {

    draw_key(ctx, x, y, x_size, y_size, type) {
        if (type == 0) {
            ctx.fillStyle = WHITE_KEY_COLOR;
        }
        else {
            ctx.fillStyle = BLACK_KEY_COLOR;
        }   
        ctx.beginPath()
        ctx.rect(x, y, x_size, y_size);
        ctx.fill();
    }
    
    rect(x,y,x_scale,y_scale) {
        ctx.beginPath()
        ctx.rect(x,y,x_scale,y_scale);
        ctx.stroke();
        ctx.fill();
    }
}