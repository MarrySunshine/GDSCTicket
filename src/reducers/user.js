/**
 * Created by lusiwei on 2016/9/23.
 */
'use strict';

import { SET_USER } from '../actions/user'

export function user(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, action.user);
        default:
            return state;
    }
}
