
class TimeChartGenerator {

    constructor(events) {
        this.events = events;
        this.note_presses = [];
    }

    generate() {

        let i = 0;

        while (i < this.events.length) {
            if (this.events[i].velocity > 0) {

                let j = i + 1;

                while (j < this.events.length && this.events[j].note != this.events[i].note) j++;

                if (j < this.events.length) {
                    
                    const dt = this.events[j].time - this.events[i].time;
                    this.note_presses.push({note : this.events[i].note, start : this.events[i].time, duration : dt})

                }
                else {
                    console.log("NOTE ERROR : note was never unpressed.");
                }
                
                this.note_presses.push(this.events[i]);
            }
            i++;
        }

        return this.note_presses;
    }
}