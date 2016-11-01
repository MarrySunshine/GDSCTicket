/**
 * Created by lusiwei on 2016/9/23.
 */
'use strict';

import React from 'react'

import { Card, CardTitle, CardText, CardActions, FlatButton } from 'material-ui'
import CountSelector from '../../components/CountSelector'

export default class TicketCard extends React.Component {
    render() {
        return (
            <Card className="card">
                <CardTitle
                    title={
                        <section>
                            {this.props.order.content.name}
                            <FlatButton style={{float: 'right', display: this.props.shouldHideDeleteButton ? 'none' :
                                'inline-block'}} label={<i className="iconfont icon-delete"
                        onClick={() => this.handleDeleteButtonClicked(this.props.order)} />} />
                        </section>
                    }
                    subtitle={this.props.order.date.format('yyyy-MM-dd')}
                />
                <CardText>
                    单价: <span>{`¥${this.props.order.content.price}`}</span> <br/>
                </CardText>
                <CardActions>
                    <CountSelector onCountChange={dis => this.handleCountChanged(this.props.order, dis)}
                                   ticketCount={this.props.order.count}/>
                    <FlatButton className="total-button" label={`¥${this.props.order.total}`}/>
                </CardActions>
            </Card>
        )
    }

    handleDeleteButtonClicked(item) {
        if (this.props.onDeleteButtonClick)
            this.props.onDeleteButtonClick(item)
    }
    handleCountChanged(item, dis) {
        if (this.props.onCountChange)
            this.props.onCountChange(item, dis);
    }

    static get propTypes() {
        return {
            order: React.PropTypes.object.isRequired,
            onDeleteButtonClick: React.PropTypes.func,
            onCountChange: React.PropTypes.func,
            shouldHideDeleteButton: React.PropTypes.bool
        }
    }
}
