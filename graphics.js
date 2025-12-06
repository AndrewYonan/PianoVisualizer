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

    draw_rect_highlight(ctx,x,y,x_size,y_size) {

        let r = 100;
        let g = 200;
        let b = 500;
        let a = 50;
        let size = 1;
        let space = 5;
        ctx.lineWidth = 3;


        for (let i = 0; i < size; ++i) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${Math.trunc(a - 50/size * i)})`;
            ctx.beginPath();
            ctx.rect(x - i*space, y - i*space, x_size + space*2*i, y_size + space*2*i);
            ctx.stroke();
        }
    }

    rect(ctx, x,y,x_scale,y_scale) {
        ctx.beginPath()
        ctx.rect(x,y,x_scale,y_scale);
        ctx.stroke();
        ctx.fill();
    }
}