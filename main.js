const canvas = document.getElementById("canvas");
const BG_MAIN_COLOR = "rgb(32, 32, 32)";
const FRAME_RATE = 60;
const W = 1200;
const H = 600;
const graphics = new Graphics();
const iterator = setInterval(frame, 1000 / FRAME_RATE);
const ctx = graphics.build_canvas(canvas, adaptive_res=true);
const BAR_SPEED = 3;

let piano = new Piano(W/2, H/2 + 175);
let FRAME = 0;
let PAUSED = false;
let midi_dump = new MIDI_DUMP();
let time_chart_generator = new TimeChartGenerator(midi_dump.EVENTS);
let time_chart = time_chart_generator.generate();
let animation = new PianoNoteAnimation(piano, time_chart, BAR_SPEED, FRAME_RATE);
let clock = new Clock(W - 200, 100, FRAME_RATE);


let audio_context = null;
let audio_buf = null;

const duration = 1.5;
const volume = 0.5;





init_event_handlers();


function frame() {

    graphics.clear(ctx);
    piano.draw(ctx);
    clock.draw(ctx);
    clock.update(FRAME);

    if (!PAUSED) animation.update();
    animation.draw(ctx);

    if (!PAUSED) FRAME++;
}