/**
 * Created by lusiwei on 16/9/2.
 */

'use strict';

import { combineReducers } from 'redux'

//import { seats_state } from './seats'
import * as venues from './venues'
import * as pavilions from './pavilions'
import * as user from './user'
import * as cart from './cart'
import * as warnings from './warnings'

export default combineReducers(Object.assign({},
    venues,
    pavilions,
    user,
    cart,
    warnings
))
