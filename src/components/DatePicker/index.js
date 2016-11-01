/**
 * Created by lusiwei on 16/9/13.
 */
'use strict';

import React from 'react'
import { FlatButton, DatePicker as DatePicker_ } from 'material-ui'

const Intl = require('intl');
require('intl/locale-data/jsonp/zh-Hans-CN');

export default class DatePicker extends React.Component {
    render() {
        return (
            <FlatButton className={this.props.className}>
                <DatePicker_ hintText={`今天(${(new Date()).format('yyyy/MM/dd')})`} locale="zh-Hans-CN" DateTimeFormat={Intl.DateTimeFormat}
                            style={{width: '8rem', visiblity: 'none'}}
                            okLabel="确定" cancelLabel="取消" onChange={this.props.onChange}/>
            </FlatButton>
        )
    }

    static get propTypes() {
        return {
            onChange: React.PropTypes.func
        }
    }
}
