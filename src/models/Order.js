'use strict';

import Film from './Film'
import Ticket from './Ticket'

export default class Order {
    constructor(count, date, content, seats) {
        this.count = count;
        this.date = date;
        this.content = content;
        this.seats = seats;
    }

    static clone(order) {
        return new Order(order.count, order.date, order.content, order.seats);
    }

    get total() {
        return parseFloat(this.content.price) * this.count;
    }

    get tk() {
        if (this.content.type === 'ticket') {
            return [this.content.id, this.count, this.content.price].join(',');
        }
        if (this.content.type ===  'film') {
            return `${this.content.id}`;
        }
    }
}
