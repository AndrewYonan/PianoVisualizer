class NoteBar {

    constructor(x, y, width, height, fall_speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fall_speed = fall_speed;
    }

    draw() {
        graphics.draw_note_bar(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.fall_speed;
    }
}