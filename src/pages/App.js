/**
 * Created by lusiwei on 16/9/14.
 */
'use strict';

import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { store } from '../stores'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Ticket from '../models/Ticket'
import Film from '../models/Film'

import { AppBar, FlatButton, Badge } from 'material-ui'

import { fetchTickets, setTickets } from '../actions/pavilions'
import { fetchFilms, setFilms } from '../actions/venues'

const muiTheme = Object.assign({}, getMuiTheme(lightTheme));
const styles = {
    appBar: {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%'
    },
    logo: {
        width: '5rem'
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        let date = new Date(Date.now());
        this.getTickets(date);
        this.getFilms(date);
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="container">
                    <AppBar
                        title={this.logo}
                        style={styles.appBar}
                        iconElementLeft={<span />}
                        iconElementRight={
                            <Badge className="badge" secondary={true}
                                onClick={() => this.handleCartClicked()}
                                badgeContent={this.props.cart_orders.length}
                                style={{display: this.props.cart_orders.length === 0 ? 'none' : 'inline-block'}}>
                                <FlatButton label="购物车" style={{color: 'white'}} />
                            </Badge>}
                    />
                    {this.props.children}
                </div>
            </MuiThemeProvider>

        )
    }

    get logo() {
        return (
            <img style={styles.logo}
                 src={require('../images/logo.png')}
                 alt="logo"
                 onClick={() => hashHistory.push('/index')} />
        )
    }

    getTickets(date) {
        store.dispatch(fetchTickets(date.format('yyyy-MM-dddd')))
            .then(result => {
                if (result.error || result.result !== '00') {
                    alert('服务器错误');
                } else {
                    let tickets = [];
                    result.ticketList.forEach(e => {
                        tickets.push(new Ticket(e));
                    });
                    store.dispatch(setTickets(tickets));
                }
            })
    }
    getFilms(date) {
        store.dispatch(fetchFilms(date.format('yyyy-MM-dd')))
            .then(result => {
                if (result.error) {
                    alert(result.error);
                } else {
                    let films = [];
                    result.data.forEach((e, index) => {
                        films.push(new Film(e));
                    });
                    store.dispatch(setFilms(films));
                }
            })
    }

    handleCartClicked() {
        hashHistory.push('/cart');
    }
}


function mapStateToProps(state) {
    return {
        cart_orders: state.orders
    }
}

export default connect(mapStateToProps)(App);
