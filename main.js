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
let PAUSED = true;
let midi_dump = new MIDI_DUMP();
let time_chart_generator = new TimeChartGenerator(midi_dump.EVENTS);
let time_chart = time_chart_generator.generate();
let animation = new PianoNoteAnimation(piano, time_chart, BAR_SPEED, FRAME_RATE);
let clock = new Clock(W - 200, 100, FRAME_RATE);
let audio_context = null;
let audio_buf = null;


init_event_handlers();



function frame() {

    graphics.clear(ctx);
    piano.draw(ctx);
    clock.draw(ctx);
    clock.update(FRAME);

    if (!PAUSED) animation.update();
    animation.draw(ctx);

    if (FRAME % 120 == 0) {
        play_sound(1.5, 1);
        // play_sound("c4", 1.5, 0.5);
    }
    // else if (FRAME % 60 == 0) {
    //     play_sound("c6", 1.5, 0.5);
    // }

    if (!PAUSED) FRAME++;
}


async function load_audio_buf() {

    const response = await fetch("c6.wav");
    const array_buf = await response.arrayBuffer();

    audio_buf = await audio_context.decodeAudioData(array_buf);
    console.log("audio file loaded.")

}


function play_sound(duration, volume) {

    if (!audio_context || !audio_buf) return;

    const source = audio_context.createBufferSource();
    source.buffer = audio_buf;

    const gain_node = audio_context.createGain();
    gain_node.gain.value = volume;

    source.connect(gain_node).connect(audio_context.destination);

    const now = audio_context.currentTime;
    source.start(now);
    source.stop(now + duration);
}