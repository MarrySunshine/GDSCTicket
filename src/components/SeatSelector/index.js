/**
 * Created by lusiwei on 16/9/13.
 */
'use strict';

require('./style.css');

import React from 'react'
import Seat from '../../components/Seat'
import { connect } from 'react-redux'
import { store } from '../../stores'
import { setBuySeatCount } from '../../actions/venues'

import SeatModel from '../../models/Seat'

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export class SeatSimple extends React.Component {
    render() {
        return (
            <div className="seat-selector-sample" style={this.props.style}>
                <span className="available"><i><img src="../images/available.png" alt="available"/></i>可选</span>
                    <span className="unavailable"><i><img src="../images/unavailable.png"
                                                          alt="unavailable"/></i>已售</span>
                <span className="chosen"><i><img src="../images/chosen.png" alt="chosen"/></i>已选</span>
            </div>
        )
    }
}

export default class SeatSelector extends React.Component {
    constructor(props) {
        super(props);
        this.seats = [];
    }
    render() {
        return (
            <div className="seat-selector" style={{overflow: 'scroll'}}>
                <SeatSimple style={{width: `${this.props.siteGraph[0].length * 2.5}rem`}} />
                <div className="seats" style={{width: `${this.props.siteGraph[0].length * 2.5}rem`}}>
                    {
                        this.props.siteGraph.map((e, row) => {
                            return (
                                <div className="row" data-row-number={row + 1} key={row}>
                                    {e.split('').map((val, col) =>
                                        <Seat key={col} status={ val }
                                              onClick={(result) => this.handleSeatClicked(result, row, col)} /> )}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    handleSeatClicked(result, row, col) {
        switch (result) {
            case 'add':
                this.seats.push(new SeatModel(row, col));
                break;
            case 'sub':
                this.seats.removeItem(new SeatModel(row, col));
                break;
            default:
                break;
        }
        if (this.props.onSeatStatusChange)
            this.props.onSeatStatusChange(this.seats);
    }

    static get propTypes() {
        return {
            siteGraph: React.PropTypes.array.isRequired,
            onSeatStatusChange: React.PropTypes.func
        }
    }
}

//<div className="screen">
//    <img src="../images/screen.png" alt="screen"/>
//    <span>荧幕</span>
//</div>
