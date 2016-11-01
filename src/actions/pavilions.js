/**
 * Created by lusiwei on 2016/9/22.
 */
'use strcit';

import requests from '../requests'
import config from '../config/base'

export const SET_TICKETS = 'SET_TICKETS';
export const SET_COUNT = 'SET_COUNT';
export const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM';

export function setTickets(tickets) {
    return {
        type: SET_TICKETS,
        tickets
    }
}

export function setCount(count) {
    return {
        type: SET_COUNT,
        count
    }
}

export function setActiveItem(item) {
    return {
        type: SET_ACTIVE_ITEM,
        item
    }
}

export function fetchTickets(date) {
    return function () {
        // return requests.get(config.route.tickets, {date});
        return new Promise((resolve, reject) => {
           resolve({
               "date": "2016-9-16",
               "result": "00",
               "ticketList": [{
                   "ticketCode": "005001000000",
                   "ticketName": "展馆门票 全票",
                   "price": 40,
                   "origPrice": 0
               }, {"ticketCode": "005002000000", "ticketName": "展馆门票 半票", "price": 20, "origPrice": 0}]
           });
        })
    }
}
