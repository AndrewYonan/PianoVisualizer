import mido
import time


PORT_NAME = "Portable Grand"

def find_piano_port_name():
    for name in mido.get_input_names():
        if PORT_NAME.lower() in name.lower():
            return name
    raise RuntimeError("Could not find MIDI input matching " + PORT_NAME)


def main():
    
    port_name = find_piano_port_name()
    start = time.perf_counter()
    js_event_array = "class MIDI_DUMP {\n\tconstructor() {\n\t\tthis.EVENTS = [\n"
        
    try:

        with mido.open_input(port_name) as inport:

            print("Listening for MIDI messages...")

            for msg in inport:

                t = time.perf_counter() - start
                event_entry = "\t\t\t{" + f"note: {msg.note}, " + f"time: {t:.6f}, " + f"velocity: {msg.velocity}" + "},\n"

                print(event_entry)
                js_event_array += event_entry


    except KeyboardInterrupt:

        js_event_array += "\t\t];\n\t}\n}"

        with open("MIDI_DUMP.js", "w") as f:
            f.write(js_event_array)

if __name__ == "__main__":
    main()