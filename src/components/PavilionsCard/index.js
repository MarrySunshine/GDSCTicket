/**
 * Created by lusiwei on 2016/10/11.
 */
require('./style.css');

import React from 'react'
import { store } from '../../stores'
import { findDOMNode } from 'react-dom'

import {
    Card, CardTitle, CardText,
    Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn
} from 'material-ui'

import DatePicker from '../DatePicker'

import Ticket from '../../models/Ticket'

import { fetchTickets } from '../../actions/pavilions'

export default class PavilionsCard extends React.Component {
    handlePavilionsCellSelected(target, item) {
        if (this.props.onSelect)
            this.props.onSelect(target, item)
    }
    render() {
        return (
            <Card className="card">
                <CardTitle title={
                    <span>
                        展馆门票
                        <DatePicker className="date-picker" onChange={(_, date) => this.handleDateChanged(date)} />
                    </span>
                } />
                <CardText>
                    <Table className="table" onRowSelection={([selected_row]) =>
                        this.handlePavilionsCellSelected(findDOMNode(this.refs[`ticket-${selected_row}`]),
                            this.props.tickets[selected_row])}>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>票名</TableHeaderColumn>
                                <TableHeaderColumn>票价</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.props.tickets.map((e, index) => (
                                <TableRow key={index} ref={`ticket-${index}`}>
                                    <TableRowColumn>{e.name}</TableRowColumn>
                                    <TableRowColumn>¥{e.price}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardText>
            </Card>
        )
    }

    handleDateChanged(date) {
        store.dispatch(fetchTickets(date.format('yyyy-MM-dd')))
            .then(result => {
                if (result.error || result.result !== '00') {
                    alert('服务器错误');
                } else {
                    let tickets = [];
                    result.ticketList.forEach(e => {
                        tickets.push(new Ticket(e));
                    });
                    if (this.props.onDatePickerChange)
                        this.props.onDatePickerChange(date, tickets);
                }
            })
    }

    static get propType() {
        return {
            tickets: React.PropTypes.array.isRequired,
            onSelect: React.PropTypes,func,
            onDatePickerChange: React.PropTypes.func
        }
    }
}
