/**
 * Created by lusiwei on 2016/9/22.
 */
'use strict';

export default class Ticket {
    constructor(argv) {
        this.id = argv.ticketCode;
        this.name = argv.ticketName;
        this.price = argv.price;
        this.orig_price = argv.origPrice;

        this.type = 'ticket';
    }
}
