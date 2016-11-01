/**
 * Created by lusiwei on 16/9/19.
 */
'use strict';

import React from 'react'

import { Card, CardTitle, CardText, CardActions, FlatButton } from 'material-ui'
// import CountSelector from '../../components/CountSelector'

export default class FilmCard extends React.Component {
    render() {
        return (
            <Card className="card">
                <CardTitle
                    title={
                        <section>
                            {this.props.order.content.name}
                            <FlatButton style={{float: 'right', display: this.props.shouldHideDeleteButton ? 'none':
                                'inline-block'}} label={<i className="iconfont icon-delete"
                        onClick={() => this.handleDeleteButtonClicked(this.props.order)} />} />
                        </section>
                    }
                    subtitle={`${this.props.order.date.format('yyyy-MM-dd')} ${this.props.order.content.time}`}
                />
                <CardText>
                    单价: <span>{`¥${this.props.order.content.price}`}</span> <br/>
                    <br/>
                    影院: <span>{`${this.props.order.content.venue_name}`}</span> <br/>
                    <br/>
                    座位: {
                    this.props.order.seats.map((seat, index) => (
                        <span key={index}>{seat.row}排{seat.col}列 </span>
                    ))
                }
                </CardText>
                <CardActions>
                    <FlatButton label={`${this.props.order.count}人次`} />
                    <FlatButton className="total-button" label={`¥${this.props.order.total}`}/>
                </CardActions>
            </Card>
        )
    }

    handleDeleteButtonClicked(item) {
        if (this.props.onDeleteButtonClick)
            this.props.onDeleteButtonClick(item)
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

