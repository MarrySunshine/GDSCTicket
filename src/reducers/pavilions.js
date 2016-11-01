/**
 * Created by lusiwei on 2016/9/22.
 */
'use strict';

import { SET_TICKETS, SET_COUNT, SET_ACTIVE_ITEM } from '../actions/pavilions'

export function tickets(state = [], action) {
    switch (action.type) {
        case SET_TICKETS:
            return action.tickets;
        default:
            return state;
    }
}

export function ticketCount(state = 1, action) {
    switch (action.type) {
        case SET_COUNT:
            return action.count;
        default:
            return state;
    }
}

export function ticketsActiveItem(state = {}, action) {
    switch (action.type) {
        case SET_ACTIVE_ITEM:
            return action.item;
        default:
            return state;
    }
}
