/**
 * Created by lusiwei on 16/9/5.
 */
import { SET_CURRENT_VENUE, SET_FILMS, SET_TARGET_FILM, SET_BUY_SEAT_COUNT } from '../actions/venues';

export function currentVenue(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_VENUE:
            return Object.assign({}, action.venue);
        default:
            return state;
    }
}

export function films(state = [], action) {
    switch (action.type) {
        case SET_FILMS:
            return action.films;
        default:
            return state;
    }
}

export function currentFilm(state = {}, action) {
    switch (action.type) {
        case SET_TARGET_FILM:
            return action.film;
        default:
            return state;
    }
}

export function buyTicketCount(state = 0, action) {
    switch (action.type) {
        case SET_BUY_SEAT_COUNT:
            return action.count;
        default:
            return state;
    }
}
