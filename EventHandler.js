
function init_event_handlers() {

    document.addEventListener("keydown", async (evt) => {

        if (evt.key == " ") {
            PAUSED = !PAUSED;
        }

        if (evt.key == "r") {
            FRAME = 0;
            animation.restart();
        }
    });
}