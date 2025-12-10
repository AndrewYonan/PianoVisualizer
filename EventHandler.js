
function init_event_handlers() {

    document.addEventListener("keydown", async (evt) => {

        if (evt.key == " ") {
            PAUSED = !PAUSED;
        }

        if (evt.key == "r") {
            FRAME = 0;
            animation.restart();
        }

        if (!audio_context) {
            audio_context = new (window.AudioContext || window.webkitAudioContext)();
        }
    
        if (audio_context.state === 'suspended') {
            await audio_context.resume();
        }
    
        if (!audio_buf) {
            await load_audio_buf();
        }

    });
}