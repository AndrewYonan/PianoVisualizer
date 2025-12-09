
class Clock {
    constructor(x, y, frame_rate) {
        this.x = x;
        this.y = y;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.frame_rate = frame_rate;
        this.milliseconds_per_frame = 1000 / frame_rate;
        this.speed = 1;
        this.ERROR_ADJUST = 1.04; // why tf do i need this?

        this.speed /= this.ERROR_ADJUST;
        

    }

    update(frame) {

        const effective_frame = frame * this.speed;

        this.seconds = Math.floor(effective_frame / this.frame_rate) % 60;
        this.minutes = Math.floor(Math.floor(effective_frame / this.frame_rate) / 60);
        this.milliseconds = Math.floor(effective_frame * this.milliseconds_per_frame) % Math.floor(this.frame_rate * this.milliseconds_per_frame);
    }

    draw(ctx) {
        graphics.draw_clock(ctx, this.minutes, this.seconds, this.milliseconds, this.x, this.y)
    }

}