/**
 * Created by lusiwei on 2016/9/26.
 */
'use strict';

import React from 'react'
import FilmCard from '../FilmCard'
import TicketCard from '../TicketCard'
import config from '../../config/base'

import {connect} from 'react-redux'

class Cart extends React.Component {
    render() {
        return (
            <div className="content">
                {this.props.orders.map((item, index) => {
                    switch (item.type) {
                        case config.order_type.film:
                            return <FilmCard film={item.content} key={index} />
                        case config.order_type.ticket:
                            return <TicketCard ticket={item.content} key={index} />
                        default:
                            return <div key={index}>空</div> ;
                    }
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orders
    }
}

export default connect(mapStateToProps)(Cart);
