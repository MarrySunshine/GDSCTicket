/**
 * Created by lusiwei on 2016/9/23.
 */
export const SET_USER = 'SET_USER';

export function setUser(user) {
    return {
        type: SET_USER,
        user
    }
}
