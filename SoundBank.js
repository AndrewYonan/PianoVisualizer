const note_buffers = {};
const NOTE_NAMES = get_note_names();


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
}


function pitch_number_to_note_str(pitch_number) {
    const octave = ["a", "aS", "b", "c", "cS", "d", "dS", "e", "f", "fS", "g", "gS"];
    const number = Math.trunc((pitch_number + 9) / 12);
    const pitch = octave[(pitch_number) % 12];
    return pitch.toString() + number.toString();
}


function get_note_names() {
    let names = [];
    for (let i = 0; i < 88; ++i) {
        names.push(pitch_number_to_note_str(i));
    }
    return names;
}


function play_sound(pitch, duration, volume) {

    const note = pitch_number_to_note_str(pitch);
    duration = Math.max(duration, 0.4);

    if (!audio_context) {
        console.log("Audio context not loaded yet.");
        return;
    }

    const buffer = note_buffers[note];


    if (!buffer) {
        console.log(`No available sound for key ${note}`);
        return;
    }

    const source = audio_context.createBufferSource();
    source.buffer = buffer;

    const gain_node = audio_context.createGain();
    gain_node.gain.value = volume;

    source.connect(gain_node).connect(audio_context.destination);

    const now = audio_context.currentTime;
    source.start(now);
    source.stop(Math.min(now + duration, now + buffer.duration));

    return source;
    
}