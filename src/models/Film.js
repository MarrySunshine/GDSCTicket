/**
 * Created by lusiwei on 16/9/21.
 */
export default class Film {
    constructor(...props) {
        let prop_obj = Object.assign({}, ...props);

        this.end_time = prop_obj.endtime;
        this.season_id = prop_obj.manifestationcode;
        this.price = prop_obj.price;
        this.start_time = prop_obj.starttime;
        this.id = prop_obj.themecode;
        this.name = prop_obj.themename;
        this.venue_id = prop_obj.themetypecode;
        this.venue_name = prop_obj.themetypename;
        this.image = prop_obj.image;

        this.type = 'film'
    }

    get time() {
        return `${this.start_time}-${this.end_time}`;
    }
}
