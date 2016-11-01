/**
 * Created by lusiwei on 16/9/13.
 */
'use strict';

require('../styles/select-seat.css');

import React from 'react'
import { connect } from 'react-redux'
import { store } from '../stores'
import { hashHistory } from 'react-router'

import { Card, CardTitle, CardText, CardActions, FlatButton } from 'material-ui'
import SeatSelector from '../components/SeatSelector'

import { addToCart } from '../actions/cart'

import Order from '../models/Order'

import config from '../config/base'

class SelectSeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seats: []
        }
    }
    render() {
        return (
            <div className="content">
                <Card className="card">
                    <CardTitle title={<span>{this.props.film.name}
                            <span style={{fontSize: '.9rem', marginLeft: '.8rem'}}>¥{this.props.film.price}</span>
                        </span>}
                               subtitle={`${this.props.order.date.format('yyyy-MM-dd')} ${this.props.film.time}`}/>

                </Card>
                <Card className="card" style={{marginBottom: '70px'}}>
                    <CardTitle title={this.props.film.venue_name} />
                    <CardText>
                        <SeatSelector onSeatStatusChange={seats => this.handleSeatStatusChanged(seats)}
                            siteGraph={config.seat_graph.four_d} />
                    </CardText>
                    <CardActions>
                        <FlatButton label="加入购物车" onClick={() => this.handleAddToCartButtonClicked()} />
                        <FlatButton label="立即购买" onClick={() => this.handleBuyNowButtonClicked()} />
                    </CardActions>
                </Card>
            </div>
        )
    }

    handleAddToCartButtonClicked() {
        if (this.state.seats.length === 0) {
            alert('请至少选择一个座位');
            return;
        }
        let order = Order.clone(this.props.order);
        order.seats = this.state.seats;
        order.count = this.state.seats.length;
        store.dispatch(addToCart(order));
    }
    handleBuyNowButtonClicked() {
        if (this.state.seats.length === 0) {
            alert('请至少选择一个座位');
            return;
        }
        hashHistory.push('/concat/buy-now');
    }
    handleSeatStatusChanged(seats) {
        this.setState({seats});
    }
}

function mapStateToProps(state) {
    return {
        order: state.currentFilm,
        film: state.currentFilm.content
    }
}

export default connect(mapStateToProps)(SelectSeat);
