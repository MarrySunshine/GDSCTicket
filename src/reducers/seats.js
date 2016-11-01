/**
 * Created by lusiwei on 16/9/2.
 */
'use strict';

import { SET_SEAT_STATE } from '../actions/seats'

export function seats_state(state, action) {
    switch (action.type) {
        case SET_SEAT_STATE:
            let new_state = Object.assign({}, state);
            new_state[action.seat_pos.x][action.seat_pos.y] = action.seat_state;
            return new_state;
        default:
            return state;
    }
}
