/**
 * Created by lusiwei on 2016/10/12.
 */
'use strict';

import React from 'react'

import { FlatButton } from 'material-ui'

export default class CountSelector extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            minWidth: '60px'
        }
    }
    render() {
        return (
            <span>
                <FlatButton style={this.style} label="-" onClick={() => this.handleCountChange(-1)}/>
                <span>{this.props.ticketCount}</span>
                <FlatButton style={this.style} label="+" onClick={() => this.handleCountChange(1)}/>
            </span>
        )
    }

    handleCountChange(dis) {
        if (this.props.onCountChange)
            this.props.onCountChange(dis)
    }

    static get propTypes() {
        return {
            ticketCount: React.PropTypes.number.isRequired,
            onCountChange: React.PropTypes.func.isRequired
        }
    }
}
