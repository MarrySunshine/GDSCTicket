/**
 * Created by lusiwei on 16/9/5.
 */
'use strict';

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/index'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export const store = createStoreWithMiddleware(rootReducer);
