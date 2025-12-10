class PianoNoteAnimation {

    constructor(piano, time_chart, bar_speed, frame_rate) {

        this.piano = piano;
        this.time_chart = time_chart;
        this.note_bars = [];
        this.bar_speed = bar_speed;
        this.paused = false;
        this.frame_rate = frame_rate;

        this.create_note_bars();

    }

    create_note_bars() {

        for (let i = 0; i < this.time_chart.length; ++i) {

            let note_press = this.time_chart[i];
            let note = note_press.note;
            let start_time = note_press.start;
            let duration = note_press.duration;
            let piano_key = this.piano.get_key(note);

            let pixels_per_second = this.bar_speed * this.frame_rate;
            let x = piano_key.x;
            let y = this.piano.break_line_y() - (start_time * pixels_per_second);
            let bar_height = duration * (pixels_per_second);
            let bar_width = piano_key.x_size;

            let bar = new NoteBar(note, duration, x, y, bar_width, bar_height, this.bar_speed, this.piano.break_line_y());
            this.note_bars.push(bar);

        }

    }

    restart() {
        this.note_bars = [];
        this.create_note_bars();
        this.piano.release_keys();
    }

    pause() {
        this.paused = true;
    }

    start() {
        this.paused = false;
    }

    update() {

        let i = 0;

        while (i < this.note_bars.length) {

            let key = this.note_bars[i].note

            if (this.note_bars[i].disintegrated) {

                this.piano.release_key(key);
                this.note_bars.splice(i,1);

            }
            else if (this.note_bars[i].hitting_key) {

                const duration = this.note_bars[i].duration;
                this.note_bars[i].update();

                if (!this.piano.is_pressed(key)) {
                    this.piano.press_key(key, duration);
                }

                this.piano.set_key_LED_color(key, this.note_bars[i].color);

                i++;
            }
            else {

                this.note_bars[i].update();

                i++;

            }
        }
    }

    draw(ctx) {  
        for (let i = 0; i < this.note_bars.length; ++i) {
            this.note_bars[i].draw(ctx);
        }
    }
}