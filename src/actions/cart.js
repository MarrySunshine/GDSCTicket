/**
 * Created by lusiwei on 2016/9/23.
 */
'use strict';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_FROM_CART = 'UPDATE_FROM_CART';

export function addToCart(order) {
    return {
        type: ADD_TO_CART,
        order
    }
}

export function removeFromCart(order) {
    return {
        type: REMOVE_FROM_CART,
        order
    }
}

export function updateFromCart(target, order) {
    return {
        type: UPDATE_FROM_CART,
        target,
        order
    }
}
