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

        let a_start = 0.7;
        let size = 16;
        let space = 1;
        ctx.lineWidth = 2;

        for (let i = 0; i < size; ++i) {

            const [r, g, b] = KEY_PRESS_COLOR.match(/\d+/g).map(Number);
            let a = a_start*(1 - (i/(size-1)));

            ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
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