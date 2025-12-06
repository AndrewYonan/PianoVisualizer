const canvas = document.getElementById("canvas");
const BG_MAIN_COLOR = "rgb(246, 246, 246)"
const frame_rate = 60;
const W = 1200;
const H = 600;
const graphics = new Graphics();
const iterator = setInterval(frame, 1000 / frame_rate);
const ctx = build_canvas(canvas, adaptive_res=true);
const NUM_WHITE_KEYS = 52;
const NUM_BLACK_KEYS = 36;
const WHITE_KEY_RATIO = 6.4;
const BLACK_KEY_RATIO = 7;

const WHITE_KEY_COLOR = "rgb(255, 255, 255)";
const BLACK_KEY_COLOR = "rgb(36, 36, 36)";
const FRAME_COLOR = "rgb(75, 75, 75)";

let piano = new Piano();
let FRAME_COUNT = 0;

let highlight_interval = 15;


function frame() {

    clear();
    center_lines();

    piano.release_keys();
    piano.press_key(Math.trunc(FRAME_COUNT / highlight_interval) % 88)
    piano.draw(ctx);


    FRAME_COUNT++;
}


function center_lines() {
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