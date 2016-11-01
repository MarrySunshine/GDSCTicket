/**
 * Created by lusiwei on 2016/9/28.
 */
import * as warningActions from '../actions/warnings'

export function shouldWarningShow(state = false, action) {
    switch (action.type) {
        case warningActions.SHOW_WARNING:
            return true;
        case warningActions.HIDE_WARNING:
            return false;
        default:
            return state;
    }
}
