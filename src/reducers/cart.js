/**
 * Created by lusiwei on 2016/9/26.
 */
'use strict';

import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_FROM_CART } from '../actions/cart'
import Order from '../models/Order'
export function orders(state = [], action) {
    let arr = [].concat(state);
    switch (action.type) {
        case ADD_TO_CART:
            arr.push(action.order);
            return arr;
        case REMOVE_FROM_CART:
            arr.removeItem(action.order);
            return arr;
        case UPDATE_FROM_CART:
            arr.updateItem(action.target, action.order);
            return arr;
        default:
            return state;
    }
}
