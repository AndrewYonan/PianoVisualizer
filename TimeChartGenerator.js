
class TimeChartGenerator {

    constructor(events) {
        this.events = events;
    }

    generate() {

        let note_presses = [];
        let i = 0;

        while (i < this.events.length) {
            if (this.events[i].velocity > 0) {

                let j = i + 1;

                while ((j < this.events.length) && (this.events[j].note != this.events[i].note)) j++;

                if (j < this.events.length) {
                    
                    const dt = this.events[j].time - this.events[i].time;
                    note_presses.push({note : this.events[i].note - 21, start : this.events[i].time, duration : dt, velocity : this.events[i].velocity})

                }
                else {
                    console.log("NOTE ERROR : note was never unpressed.");
                }
            
            }
            i++;
        }

        return note_presses;
    }
}