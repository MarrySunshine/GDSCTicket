/**
 * Created by lusiwei on 16/9/5.
 */
'use strict';

import requests from '../requests'
import config from '../config/base'

export const SET_CURRENT_VENUE = 'SET_CURRENT_VENUE';
export const SET_FILMS = 'SET_FILMS';
export const SET_TARGET_FILM = 'SET_TARGET_FILM';
export const SET_BUY_SEAT_COUNT = 'SET_BUY_SEAT_COUNT';

export function setCurrentVenue(venue) {
    return {
        type: SET_CURRENT_VENUE,
        venue
    }
}

export function setFilms(films) {
    return {
        type: SET_FILMS,
        films
    }
}

export function setTargetFilm(film) {
    return {
        type: SET_TARGET_FILM,
        film
    }
}

export function setBuySeatCount(count) {
    return {
        type: SET_BUY_SEAT_COUNT,
        count
    }
}
export function fetchFilms(date) {
    return function () {
        // return requests.get(config.route.films, {date});
        return new Promise((resolve, reject) => {
           resolve({
               "data": [{
                   "endtime": "11:00",
                   "themetypename": "四维影院",
                   "starttime": "10:50",
                   "price": 20,
                   "themename": "鲑鱼跳龙门",
                   "manifestationcode": "38732",
                   "themecode": "4d010",
                   "themetypecode": "03"
               }, {
                   "endtime": "14:40",
                   "themetypename": "虚拟影院",
                   "starttime": "14:40",
                   "price": 15,
                   "themename": "陆地狂飙猪",
                   "manifestationcode": "38729",
                   "themecode": "xn008",
                   "themetypecode": "04"
               }, {
                   "endtime": "11:50",
                   "themetypename": "虚拟影院",
                   "starttime": "11:50",
                   "price": 15,
                   "themename": "陆地狂飙猪",
                   "manifestationcode": "38735",
                   "themecode": "xn008",
                   "themetypecode": "04"
               }, {
                   "endtime": "14:00",
                   "themetypename": "虚拟影院",
                   "starttime": "14:00",
                   "price": 15,
                   "themename": "陆地狂飙猪",
                   "manifestationcode": "38743",
                   "themecode": "xn008",
                   "themetypecode": "04"
               }, {
                   "endtime": "11:10",
                   "themetypename": "虚拟影院",
                   "starttime": "11:10",
                   "price": 15,
                   "themename": "陆地狂飙猪",
                   "manifestationcode": "38737",
                   "themecode": "xn008",
                   "themetypecode": "04"
               }, {
                   "endtime": "15:20",
                   "themetypename": "虚拟影院",
                   "starttime": "15:20",
                   "price": 15,
                   "themename": "陆地狂飙猪",
                   "manifestationcode": "38738",
                   "themecode": "xn008",
                   "themetypecode": "04"
               }]
           })
        })
    }
}
