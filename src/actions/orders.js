/**
 * Created by lusiwei on 2016/10/19.
 */

import requests from '../requests'
import config from '../config/base'

export function fetchCreateOrder(order, phone, name) {
    return function () {
        return requests.get(config.route.createOrder, {
            validDate: order.date,
            tk: order.tk,
            mobile: phone,
            name
        })
    }
}

export function fetchOnlinePay(paytype, client_token) {
    return function () {
        return requests.get(config.route.onlinePay, {paytype, client_token})
    }
}
