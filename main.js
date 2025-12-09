const canvas = document.getElementById("canvas");
const BG_MAIN_COLOR = "rgb(32, 32, 32)"
const FRAME_RATE = 60;
const W = 1200;
const H = 600;
const graphics = new Graphics();
const iterator = setInterval(frame, 1000 / FRAME_RATE);
const ctx = build_canvas(canvas, adaptive_res=true);
const NUM_WHITE_KEYS = 52;
const NUM_BLACK_KEYS = 36;
const WHITE_KEY_RATIO = 6.4;

const WHITE_KEY_COLOR = "rgb(255, 255, 255)";
const BLACK_KEY_COLOR = "rgb(36, 36, 36)";
const FRAME_COLOR = "rgb(75, 75, 75)";
const BAR_COLOR = "rgb(237, 68, 53)";
const BAR_SPEED = 3;

let piano = new Piano();
let FRAME = 0;
let PAUSED = false;

let midi_dump = new MIDI_DUMP();
let time_chart_generator = new TimeChartGenerator(midi_dump.EVENTS);
let time_chart = time_chart_generator.generate();

let animation = new PianoNoteAnimation(piano, time_chart, BAR_SPEED, FRAME_RATE);
let clock = new Clock(W - 200, 100, FRAME_RATE);

console.log("TIME CHART, ", time_chart);


init_event_handlers();


function frame() {

    clear();
    // center_lines();
    piano.draw(ctx);
    clock.draw(ctx);
    clock.update(FRAME);

    if (!PAUSED) animation.update();
    animation.draw(ctx);

    if (!PAUSED) FRAME++;
}


function center_lines() {
    ctx.strokeStyle = "rgb(33, 33, 33)";
    ctx.lineWidth = 0.1;
    line(0, H/2, W, H/2);
    line(W/2, 0, H, W/2);
}

function clear() {
    ctx.clearRect(0,0,W,H);
}



function line(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke()
}



function build_canvas(canvas, adaptive_res) {

    const dpr = window.devicePixelRatio || 1; 

    if (adaptive_res) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
    }
    else {
        canvas.width = W;
        canvas.height = H;
    }
    
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.transform = "translateX(-50%)"
    canvas.style.backgroundColor = BG_MAIN_COLOR;;

    const ctx = canvas.getContext('2d');
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (adaptive_res) {
        ctx.scale(dpr, dpr);
    }

    return ctx;
}