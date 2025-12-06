class Piano {
    constructor() {
        
        this.wkey_spacing = 1;

        this.wkey_w = 20;
        this.wkey_l = this.wkey_w * WHITE_KEY_RATIO;
        this.frame_margin = 20;

        this.bkey_w = this.wkey_w/2;
        this.bkey_l = this.wkey_l * 2/3;
        
        this.frame_size_x = this.get_frame_size_x();
        this.frame_size_y = this.get_frame_size_y();
        this.x = W/2;
        this.y = H/2 + 150;

        this.white_keys = [];
        this.black_keys = [];
        this.build_keys();

        this.ordered_keys = this.merge_white_and_black_keys();
    }

    get_frame_size_x() {
        return (this.wkey_w * NUM_WHITE_KEYS + this.wkey_spacing * (NUM_WHITE_KEYS - 1)) + this.frame_margin;
    }

    get_frame_size_y() {
        return this.wkey_l + this.frame_margin;
    }

    stagger(val) {
        let i = 0;
        for (let key of this.ordered_keys) {
            key.y -= (20 + i*val);
            i++;
        }
    }

    build_keys() {

        let start_x = this.x - (NUM_WHITE_KEYS * this.wkey_w + (NUM_WHITE_KEYS - 1) * this.wkey_spacing)/2;
        let start_y = this.y - (this.wkey_l)/2
        this.build_white_keys(start_x, start_y);
        this.build_black_keys(start_x, start_y);

    }

    build_black_keys(start_x, start_y) {

        let num_octaves = (NUM_WHITE_KEYS - 3)/7;
        let octave_start = start_x;
    
        for (let i = 0; i < num_octaves; ++i) {

            let wkeys_per_oct = 7;
            let oct_len = wkeys_per_oct * this.wkey_w + (wkeys_per_oct - 1) * this.wkey_spacing;
            
            let Bb = new Key(octave_start + this.wkey_w + this.wkey_spacing/2 - this.bkey_w/2, start_y, this.bkey_w, this.bkey_l, 1);

            let Db = new Key(octave_start + this.wkey_w*3 + 5*this.wkey_spacing/2 - this.bkey_w/2, start_y, this.bkey_w, this.bkey_l, 1);
            let Eb = new Key(octave_start + this.wkey_w*4 + 7*this.wkey_spacing/2 - this.bkey_w/2, start_y, this.bkey_w, this.bkey_l, 1);

            let Gb = new Key(octave_start + this.wkey_w*6 + 11*this.wkey_spacing/2 - this.bkey_w/2, start_y, this.bkey_w, this.bkey_l, 1);
            let Ab = new Key(octave_start + this.wkey_w*7 + 13*this.wkey_spacing/2 - this.bkey_w/2, start_y, this.bkey_w, this.bkey_l, 1);

            this.black_keys.push(Bb);
            this.black_keys.push(Db);
            this.black_keys.push(Eb);
            this.black_keys.push(Gb);
            this.black_keys.push(Ab);

            octave_start += (oct_len + this.wkey_spacing);

        }   

        let Ab_last = new Key(octave_start + this.wkey_w + this.wkey_spacing/2 - this.bkey_w/2, start_y, this.bkey_w, this.bkey_l, 1);
        this.black_keys.push(Ab_last);
    }

    build_white_keys(start_x, start_y) {
        for (let i = 0; i < NUM_WHITE_KEYS; ++i) {
            let key = new Key(start_x + i*(this.wkey_w + this.wkey_spacing), start_y, this.wkey_w, this.wkey_l, 0);
            this.white_keys.push(key);
        }
    }

    merge_white_and_black_keys() {

        let w_idx = 0;
        let b_idx = 0;
        let merged = [];
        
        while ((w_idx < NUM_WHITE_KEYS) && (b_idx < NUM_BLACK_KEYS)) {

            if (this.white_keys[w_idx].x <= this.black_keys[b_idx].x) {

                merged.push(this.white_keys[w_idx++]);

                while ((w_idx < NUM_WHITE_KEYS) && (this.white_keys[w_idx].x <= this.black_keys[b_idx].x)) {
                    merged.push(this.white_keys[w_idx++]);
                }
                
            }
            else {

                merged.push(this.black_keys[b_idx++]);

                while ((b_idx < NUM_BLACK_KEYS) && (this.white_keys[w_idx].x > this.black_keys[b_idx].x)) {
                    merged.push(this.black_keys[b_idx++]);
                }
            }
        }

        while (w_idx < NUM_WHITE_KEYS) {
            merged.push(this.white_keys[w_idx++])       
        }

        while (b_idx < NUM_BLACK_KEYS) {
            merged.push(this.black_keys[b_idx++])       
        }

        return merged;
    }

    draw_keys(ctx) {
        for (const key of this.white_keys) {
            key.draw(ctx);
        }
        for (const key of this.black_keys) {
            key.draw(ctx);
        }
    }
    draw_frame(ctx) {
        ctx.lineWidth = 1;
        ctx.fillStyle = FRAME_COLOR;
        graphics.rect(this.x - this.frame_size_x / 2, this.y - this.frame_size_y / 2, this.frame_size_x, this.frame_size_y);
    }
    draw(ctx) {
        this.draw_frame(ctx);
        this.draw_keys(ctx);
    }

}