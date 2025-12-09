class Key {
    constructor(x,y,x_size,y_size,type) {
        this.type = type; // 0 = white, 1 = black
        this.x = x;
        this.y = y;
        this.x_size = x_size;
        this.y_size = y_size;
        this.highlighted = false;
        this.LED_color = "rgb(255,255,255)";
    }
    set_LED_color(color) {
        this.LED_color = color;
    }
    press() {
        this.highlighted = true;
    }
    release() {
        this.highlighted = false;
    }
    draw_highlight(ctx) {
        graphics.draw_vertical_gradient_highlight(ctx, this.x, this.y, this.x_size, this.y_size, this.LED_color);
    }
    draw(ctx) {
        graphics.draw_key(ctx, this.x, this.y, this.x_size, this.y_size, this.type);
    }
}