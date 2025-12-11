
async function load_note(note) {
    const url = `Sounds/${note}.wav`;
    const res = await fetch(url);
    const array_buf = await res.arrayBuffer();
    const audio_buf = await audio_context.decodeAudioData(array_buf);
    note_buffers[note] = audio_buf;
}


async function load_all_notes() {
    const promises = NOTE_NAMES.map(load_note);
    await Promise.all(promises);
    console.log("All note samples loaded.");
}



class SoundBank {

    constructor() {
        this.volume = 0.5;
    }

    play_sound(pitch, duration) {


        const note = ["a", "b", "c", "d", "e", "f", "g"][pitch % 6] + "4";
        console.log(`Trying to play ${note}`);
        
        duration = Math.max(duration, 0.5);

        if (!audio_context) {
            console.log("Audio context not loaded yet.");
            return;
        }
    
        const key = note.toLowerCase();
        const buffer = note_buffers[key];
    
    
        if (!buffer) {
            console.log(`No available sound for key ${key}`);
            return;
        }
    
        const source = audio_context.createBufferSource();
        source.buffer = buffer;
    
        const gain_node = audio_context.createGain();
        gain_node.gain.value = this.volume;
    
        source.connect(gain_node).connect(audio_context.destination);
    
        const now = audio_context.currentTime;
        source.start(now);
        source.stop(Math.min(now + duration, now + buffer.duration));
    
        return source;
    
    }
}