class Key {
    constructor(x,y,x_size,y_size,type) {
        this.type = type; // 0 = white, 1 = black
        this.x = x;
        this.y = y;
        this.x_size = x_size;
        this.y_size = y_size;
        this.pressed = false;
        this.LED_color = "rgb(255,255,255)";
    }

    set_LED_color(color) {
        this.LED_color = color;
    }

    press() {
        this.pressed = true;
    }

    release() {
        this.pressed = false;
    }

    draw_highlight(ctx) {

        let highlight_width;
        let x;
        let y_size;

        if (this.type == 0) {
            x = this.x;
            y_size = this.y_size;
            highlight_width = this.x_size;
        }
        else {
            highlight_width = this.x_size * 3;
            y_size = this.y_size * 1.2;
            x = this.x + this.x_size/2 - highlight_width / 2;
        }

        graphics.draw_note_strike_gradient(ctx, this.x, this.y, this.x_size, this.LED_color);
        graphics.draw_vertical_gradient_highlight(ctx, x, this.y, highlight_width, y_size, this.LED_color);
        
    }

    draw(ctx) {
        graphics.draw_key(ctx, this.x, this.y, this.x_size, this.y_size, this.type);
    }
}