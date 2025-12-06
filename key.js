class Key {
    constructor(x,y,x_size,y_size,type) {
        this.type = type; // 0 = white, 1 = black
        this.x = x;
        this.y = y;
        this.x_size = x_size;
        this.y_size = y_size;
        this.highlighted = false;
    }
    draw(ctx) {
        graphics.draw_key(ctx, this.x, this.y, this.x_size, this.y_size, this.type, this.highlighted);
    }
}