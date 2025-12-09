class PianoNoteAnimation {

    constructor(piano, time_chart, bar_speed, frame_rate) {

        this.piano = piano;
        this.time_chart = time_chart;
        this.note_bars = [];
        this.bar_speed = bar_speed;
        this.paused = false;
        this.frame_rate = frame_rate;
        this.NOTE_MAX = 10;

        this.create_note_bars();

    }

    create_note_bars() {

        for (let i = 0; i < this.time_chart.length; ++i) {

            let note_press = this.time_chart[i];
            let note = note_press.note;
            let start_time = note_press.start;
            let duration = note_press.duration;
            let piano_key = this.piano.get_key(note);

            console.log(note, start_time, duration);

            let pixels_per_second = this.bar_speed * this.frame_rate;
            let x = piano_key.x;
            let y = this.piano.break_line_y() - (start_time * pixels_per_second);
            let bar_height = 20;
            let bar_width = piano_key.x_size;

            let bar = new NoteBar(x, y, bar_width, bar_height, this.bar_speed);
            this.note_bars.push(bar);

        }

    }

    pause() {
        this.paused = true;
    }

    start() {
        this.paused = false;
    }

    update() {
        for (let i = 0; i < this.note_bars.length; ++i) {
            this.note_bars[i].update();
        }
    }

    draw() {  
        for (let i = 0; i < this.note_bars.length; ++i) {
            this.note_bars[i].draw();
        }
    }
}