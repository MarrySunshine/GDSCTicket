'use strict';

require('./styles/App.css');

import "core-js/fn/object/assign";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRedirect, hashHistory} from "react-router";
import {Provider} from "react-redux";
import {store} from "./stores/index";
import App from "./pages/App";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import Concat from "./pages/Concat";
import SelectSeat from "./pages/SelectSeat";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

Date.prototype.format = function (fmt) {
    var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
};

Array.prototype.isArray = true;
Array.prototype.findByProp = function (name, val) {
    let target = null;
    for (let i of this) {
        if (i[name] === val) target = i;
    }
    return target;
};
Array.prototype.itemIndexOf = function (item) {
    for (let i = 0; i < this.length; ++i) {
        if (this[i] == item) return i;
    }
    return -1;
};
Array.prototype.removeItem = function (item) {
    return this.splice(this.itemIndexOf(item), 1);
};
Array.prototype.updateItem = function (target, item) {
    return this.splice(this.itemIndexOf(target), 1, item);
};

String.prototype.map = function (callback) {
    let array = [];
    for (let i = 0; i < this.length; ++i) {
        array.push(callback(this[i], i));
    }
    return array;
};

// Render the main component into the dom
ReactDOM.render(
    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ App }>
                <IndexRedirect to="index"/>
                <Route path="index" component={ Index }/>
                <Route path="cart" component={ Cart }/>
                <Route path="select-seat" component={ SelectSeat }/>
                <Route path="concat/:type" component={ Concat }/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('app'));
