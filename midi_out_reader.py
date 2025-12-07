import mido


PORT_NAME = "Portable Grand"

def find_piano_port_name():
    for name in mido.get_input_names():
        if PORT_NAME.lower() in name.lower():
            return name
    raise RuntimeError("Could not find MIDI input matching " + PORT_NAME)


def main():
    
    notes = 0
    port_name = find_piano_port_name()

    with mido.open_input(port_name) as inport:
        print("Listening for MIDI messages")
        for msg in inport:
            if msg.type == "note_on":
                print(msg)
                if msg.velocity > 0:
                    notes += 1

            
            # print("Notes played: ", notes)
    

if __name__ == "__main__":
    main()