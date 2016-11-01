/**
 * Created by lusiwei on 2016/10/12.
 */
'use strict';

require('../styles/cart.css');

import React from 'react'
import { store } from '../stores'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Film from '../models/Film'
import Ticket from '../models/Ticket'
import Order from '../models/Order'

import { AppBar, FlatButton } from 'material-ui'
import TicketCard from '../components/TicketCard'
import FilmCard from '../components/FilmCard'

import { removeFromCart, updateFromCart } from '../actions/cart'

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content">
                <section className="card-container">
                    {this.props.cart_orders.map((item, index) => (
                        item.content instanceof Ticket ?
                            <TicketCard order={item} key={index}
                                        onDeleteButtonClick={item => this.handleDeleteButtonClicked(item)}
                                        onCountChange={(item, dis) => this.handleCountChanged(item, dis)}
                            />
                            :
                            <FilmCard order={item} />
                    ))}
                </section>
                <AppBar className="bottom-bar"
                        title={`¥${this.total}`}
                        iconElementLeft={<span />}
                        iconElementRight={<FlatButton onClick={this.handleBuyButtonClicked} label="结算"/>}
                />
            </div>
        )
    }

    get total() {
        let result = 0;
        this.props.cart_orders.forEach(item => result += item.total);
        return result;
    }

    handleDeleteButtonClicked(item) {
        store.dispatch(removeFromCart(item));
    }
    handleCountChanged(item, dis) {
        if (item.count + dis < 1) return;
        let order = Order.clone(item);
        order.count += dis;
        store.dispatch(updateFromCart(item, order));
    }
    handleBuyButtonClicked() {
        hashHistory.push('/concat/cart');
    }
}


function mapStateToProps(state) {
    return {
        cart_orders: state.orders
    }
}

export default connect(mapStateToProps)(Cart);
