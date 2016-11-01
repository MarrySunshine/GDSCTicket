/**
 * Created by lusiwei on 16/9/12.
 */
'use strict';

require('../styles/index.css');

import React from 'react'
import { hashHistory } from 'react-router'
import { store } from '../stores'
import { connect } from 'react-redux'

import Order from '../models/Order'

import { Popover, Menu, MenuItem, FlatButton } from 'material-ui'
import PavilionsCard from '../components/PavilionsCard'
import VenuesCard from '../components/VenuesCard'
import CountSelector from '../components/CountSelector'

import { addToCart } from '../actions/cart'
import { setTargetFilm, setFilms } from '../actions/venues'
import { setTickets } from '../actions/pavilions'

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_tab: 'pavilions',
            should_popover_show: false,
            target_ticket_item: {
                anchor: {},
                item: {}
            },
            ticket_count: 1,
            films_date: new Date(),
            tickets_date: new Date(),
            filter_item: 0
        }
    }
    render() {
        return (
            <div className="content">
                <PavilionsCard tickets={this.props.tickets}
                               onDatePickerChange={(date, tickets) => this.handlePavilionsDatePickerChanged(date, tickets)}
                               onSelect={(target, item) => this.handlePavilionsCellSelected(target, item)} />
                <VenuesCard films={this.filterFilms(this.props.films)}
                            onDatePickerChange={(date, tickets) => this.handleVenuesDatePickerChanged(date, tickets)}
                            onSelect={item => this.handleVenuesSelected(item)}
                            onTabsChange={(_, __, tab) => this.handleTabsChanged(tab.props.index)} />
                {this.popover}
            </div>
        )
    }

    get popover() {
        return (
            <Popover open={this.state.should_popover_show}
                     anchorEl={this.state.target_ticket_item.anchor}
                     anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                     targetOrigin={{horizontal: 'right', vertical: 'top'}}
                     onRequestClose={() => this.setState({
                        should_popover_show: false,
                        ticket_count: 1,
                        target_ticket_item: {anchor: this.state.target_ticket_item.anchor, item: {}}})}>
                <Menu>
                    <MenuItem primaryText={<CountSelector ticketCount={this.state.ticket_count}
                        onCountChange={dis => this.handleCountChanged(dis)} />} disabled/>
                    <MenuItem primaryText="加入购物车" onTouchTap={() => this.handleAddOrderToCart()} />
                    <MenuItem primaryText="立即购买" onTouchTap={() => this.handleBuyNowClicked()} />
                </Menu>
            </Popover>
        )
    }

    handlePavilionsCellSelected(target, item) {
        this.setState({
            target_ticket_item: {
                anchor: target,
                item
            },
            should_popover_show: true
        });
    }
    handleVenuesSelected(item) {
        store.dispatch(setTargetFilm(new Order(0, this.state.films_date, item)));
        hashHistory.push('/select-seat');
    }
    handleCountChanged(dis) {
        let count = this.state.ticket_count + dis;
        this.setState({ticket_count: count < 1 ? 1 : count});
    }
    handlePavilionsDatePickerChanged(tickets_date, tickets) {
        this.setState({tickets_date});
        store.dispatch(setTickets(tickets));
    }
    handleVenuesDatePickerChanged(films_date, films) {
        this.setState({films_date});
        store.dispatch(setFilms(films));
    }
    handleAddOrderToCart() {
        store.dispatch(addToCart(new Order(this.state.ticket_count,
            this.state.tickets_date,
            this.state.target_ticket_item.item)));
        this.setState({should_popover_show: false, ticket_count: 1});
    }
    handleBuyNowClicked() {
        hashHistory.push({pathname: '/concat/buy-now', state: {order: new Order(1, this.state.tickets_date,
            this.state.target_ticket_item.item)}});
    }
    handleTabsChanged(index) {
        this.setState({filter_item: index});
    }

    filterFilms(films) {
        let filter = this.state.filter_item === 0 ? null : `0${this.state.filter_item}`,
            filtered_films = [];

        if (filter) {
            films.forEach(item => {
                if (item.venue_id === filter)
                    filtered_films.push(item);
            })
        } else {
            filtered_films = films;
        }

        return filtered_films;
    }
}

function mapStateToProps(state) {
    return {
        tickets: state.tickets,
        films: state.films
    }
}

export default connect(mapStateToProps)(Index);
