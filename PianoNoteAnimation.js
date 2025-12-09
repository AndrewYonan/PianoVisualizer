class PianoNoteAnimation {

    constructor(piano, time_chart, bar_speed) {

        this.piano = piano;
        this.time_chart = time_chart;
        this.note_bars = [];
        this.bar_speed = bar_speed;
        this.paused = false;

    }

    pause() {
        this.paused = true;
    }

    start() {
        this.paused = false;
    }

    draw() {
        for (let i = 0; i < this.note_bars.length; ++i) {
            this.note_bars[i].update();
        }
    }

    render() {  
        for (let i = 0; i < this.note_bars.length; ++i) {
            this.note_bars[i].draw();
        }
    }
}