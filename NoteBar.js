class NoteBar {

    constructor(note, duration, x, y, width, height, fall_speed, disintegration_height) {

        this.note = note;
        this.duration = duration;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fall_speed = fall_speed;
        this.disintegration_height = disintegration_height;
        this.disintegrated = false;
        this.hitting_key = false;
        this.color = BAR_COLOR;
        this.bar_rounding = 4;
    }

    draw(ctx) {
        let y = Math.min(this.y, this.disintegration_height);
        graphics.draw_note_bar(ctx, this.x, y, this.width, this.height, this.bar_rounding, this.color);
    }

    update() {

        if (this.disintegrated) return;

        if (this.y >= this.disintegration_height) {

            this.hitting_key = true;
            this.y = this.disintegration_height;
            this.height -= this.fall_speed;

            if (this.height <= 0) {
                this.disintegrated = true;
            }
        }
        else {

            this.y += this.fall_speed;
            this.hitting_key = false;

        }
        
    }
}