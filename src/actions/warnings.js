/**
 * Created by lusiwei on 2016/9/28.
 */
'use strict';

export const SHOW_WARNING = 'SHOW_WARNING';
export const HIDE_WARNING = 'HIDE_WARNING';

export function showWaring() {
    return {
        type: SHOW_WARNING
    }
}
export function hideWaring() {
    return {
        type: HIDE_WARNING
    }
}
