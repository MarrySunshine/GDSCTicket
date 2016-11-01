/**
 * Created by lusiwei on 16/9/13.
 */
'use strict';

require('./style.css');

import React from 'react'

const status_img = ['', require('../../images/available.png'), require('../../images/unavailable.png'),
    require('../../images/chosen.png')];
const status_classes = ['invisible', 'available', 'unavailable', 'chosen'];

export default class Seat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status
        }
    }
    render() {
        return (
            <span onClick={ () => this.handleClick() } className={`seat ${status_classes[this.state.status]}`}>
                <img src={status_img[this.state.status]} alt="seat"/>
                <span className="number">{ this.props.number }</span>
            </span>
        )
    }
    get propTypes() {
        return {
            row: React.PropTypes.number.isRequired,
            col: React.PropTypes.number.isRequired,
            id: React.PropTypes.number.isRequired
        }
    }

    handleClick() {
        let last_status = this.state.status;

        if (this.state.status === 0 || this.state.status === 2) return;
        else if (this.state.status === 3) last_status = 1;
        else last_status = 3;

        if (last_status === 3) this.props.onClick('add');
        else if (last_status === 1) this.props.onClick('sub');

        this.setState({status: last_status})
    }
}
