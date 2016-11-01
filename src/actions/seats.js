/**
 * Created by lusiwei on 16/9/2.
 */
'use strict';

import requests from '../requests'
import config from '../config/base'

export const SET_SEAT_STATE = 'SEA_SEAT_STATE';
export const SET_SEATS = 'SET_SEATS';

export function setSeatState(seat_pos, seat_state) {
    return {
        type: SET_SEAT_STATE,
        seat_pos,
        seat_state
    }
}

export function setSeats(seats) {
    return {
        type: SET_SEATS,
        seats
    }
}

export function fecthSeats(season_id) {
    return function () {
        return requests.get(config.route.seats, {manifestationcode: season_id});
    }
}
