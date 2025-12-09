class Graphics {

    draw_key(ctx, x, y, x_size, y_size, type) {
        if (type == 0) {
            ctx.fillStyle = WHITE_KEY_COLOR;
        }
        else {
            ctx.fillStyle = BLACK_KEY_COLOR;
        }   
        ctx.beginPath();
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

    get_space(len, font_size) {
        return len * font_size/4 + 40;
    }

    draw_clock(ctx, minutes, seconds, milliseconds, x, y) {

        const font_size = 30;
        ctx.font = `${font_size}px "Times New Roman "`;
        ctx.fillStyle = "#000";

        const minutes_len = minutes.toString().length;
        let minutes_spacing = this.get_space(minutes_len, font_size);
        let minutes_pad = "";
        
        if (minutes_len <= 2) {
            minutes_pad = "0".repeat(2 - minutes_len);
        }
    
        ctx.fillText(minutes_pad + minutes.toString(), x, y)
        x += minutes_spacing;

        const seconds_len = seconds.toString().length;
        let seconds_pad = "0".repeat(2 - seconds_len);
        let seconds_spacing = this.get_space(2, font_size);

        ctx.fillText(": " + seconds_pad + seconds.toString(), x, y);
        x += seconds_spacing;

        const milliseconds_len = milliseconds.toString().length;
        let milliseconds_pad = "0".repeat(3 - milliseconds_len);
        
        ctx.fillText(": " + milliseconds_pad + milliseconds.toString(), x, y);

    }

    draw_note_bar(x, y, width, height) {
        ctx.fillStyle = "rgb(255, 45, 45)"
        ctx.beginPath();
        ctx.rect(x, y - height, width, height);
        ctx.fill();
    }

    rect(ctx, x,y,x_scale,y_scale) {
        ctx.beginPath()
        ctx.rect(x,y,x_scale,y_scale);
        ctx.stroke();
        ctx.fill();
    }
}