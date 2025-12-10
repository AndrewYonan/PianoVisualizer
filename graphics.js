

const WHITE_KEY_COLOR = "rgb(255, 255, 255)";
const BLACK_KEY_COLOR = "rgb(36, 36, 36)";
const FRAME_COLOR = "rgb(75, 75, 75)";
const BAR_COLOR = "rgb(255, 255, 255)";



class Graphics {

    clear(ctx) {
        ctx.clearRect(0,0,W,H);
    }

    build_canvas(canvas, adaptive_res) {

        const dpr = window.devicePixelRatio || 1; 
    
        if (adaptive_res) {
            canvas.width = W * dpr;
            canvas.height = H * dpr;
        }
        else {
            canvas.width = W;
            canvas.height = H;
        }
        
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
        
        canvas.style.position = "absolute";
        canvas.style.left = "50%";
        canvas.style.transform = "translateX(-50%)"
        canvas.style.backgroundColor = BG_MAIN_COLOR;;
    
        const ctx = canvas.getContext('2d');
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
    
        if (adaptive_res) {
            ctx.scale(dpr, dpr);
        }
    
        return ctx;
    }

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

    draw_piano_hit_line(ctx, start_x, start_y, end_x, end_y) {
        ctx.strokeStyle = BAR_COLOR;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(end_x, end_y);
        ctx.stroke();
    }

    draw_vertical_gradient_highlight(ctx, x, y, x_size, y_size, color) {

        let a_start = 0.7;
        ctx.lineWidth = 2;

        for (let i = 0; i < y_size; ++i) {

            const [r, g, b] = color.match(/\d+/g).map(Number);
            let a = a_start * (1 - (i / (y_size - 1)));

            ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
            ctx.beginPath();
            ctx.moveTo(x, y + i);
            ctx.lineTo(x + x_size, y + i);
            ctx.stroke();
        }

    }   
    
    draw_note_strike_gradient(ctx, x, y, x_size, color) {

        let a_start = 0.7;
        let height = 20;
        ctx.lineWidth = 2;

        for (let i = 0; i < height; ++i) {

            const [r, g, b] = color.match(/\d+/g).map(Number);
            let a = a_start * (1 - (i / (height - 1)));

            ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
            ctx.beginPath();
            ctx.moveTo(x - i/2, y - i);
            ctx.lineTo(x + x_size + i/2, y - i);
            ctx.stroke();
        }
    }

    draw_rect_highlight(ctx, x, y, x_size, y_size) {

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
        ctx.font = `${font_size}px "Times New Roman"`;
        ctx.fillStyle = "#888";

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

    draw_note_bar(ctx, x, y, width, height, rounding, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        this.rounded_rect(ctx, x, y - height, width, height, rounding, color);
        ctx.fill();
    }

    mark_point(x, y) {
        ctx.strokeStyle = "red";
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, 2*Math.PI, true);
        ctx.stroke();
    }

    rect(ctx, x,y,x_scale,y_scale) {
        ctx.beginPath()
        ctx.rect(x,y,x_scale,y_scale);
        ctx.fill();
    }

    rounded_rect(ctx, x, y, width, height, border_radius, color) {
        ctx.fillStyle = color;
        if (border_radius > 0) {
            ctx.beginPath();
            ctx.moveTo(x + border_radius, y);
            ctx.lineTo(x + width - border_radius, y); 
            ctx.quadraticCurveTo(x + width, y, x + width, y + border_radius); 
            ctx.lineTo(x + width, y + height - border_radius); 
            ctx.quadraticCurveTo(x + width, y + height, x + width - border_radius, y + height);
            ctx.lineTo(x + border_radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - border_radius);
            ctx.lineTo(x, y + border_radius); 
            ctx.quadraticCurveTo(x, y, x + border_radius, y);
            ctx.closePath();
        } 
        else {
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.closePath();
        }
    }
}