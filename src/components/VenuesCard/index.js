/**
 * Created by lusiwei on 2016/10/13.
 */
require('./style.css');

import React from 'react'
import { store } from '../../stores'

import {
    Tabs, Tab,
    Card, CardTitle, CardText,
    Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn
} from 'material-ui'

import DatePicker from '../DatePicker'

import Film from '../../models/Film'

import { fetchFilms } from '../../actions/venues'

export default class VenuesCard extends React.Component {
    render() {
        return (
            <Card className="card">
                <CardTitle
                    title={
                        <span>
                            科普电影票
                            <DatePicker className="date-picker" onChange={(_, date) => this.handleDateChanged(date)} />
                        </span>
                    }
                    subtitle={
                        <Tabs className="tabs" onChange={this.props.onTabsChange}>
                            <Tab label="全部"/>
                            <Tab label="巨幕"/>
                            <Tab label="球幕"/>
                            <Tab label="四维"/>
                            <Tab label="虚拟"/>
                        </Tabs>
                    }
                />
                <CardText>
                    <Table className="table" onRowSelection={([select_row]) => this.handleSelected(select_row)}>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>片名</TableHeaderColumn>
                                <TableHeaderColumn>时间</TableHeaderColumn>
                                <TableHeaderColumn>价格</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.props.films.map((e, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{e.name}</TableRowColumn>
                                    <TableRowColumn>{e.time}</TableRowColumn>
                                    <TableRowColumn>¥{e.price}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardText>
            </Card>
        )
    }

    handleSelected(select_row) {
        if (this.props.onSelect)
            this.props.onSelect(this.props.films[select_row]);
    }
    handleDateChanged(date) {
        store.dispatch(fetchFilms(date.format('yyyy-MM-dd')))
            .then(result => {
                if (result.error) {
                    alert(result.error);
                } else {
                    let films = [];
                    result.data.forEach((e, index) => {
                        films.push(new Film(e));
                    });
                    if (this.props.onDatePickerChange) {
                        this.props.onDatePickerChange(date, films);
                    }
                }
            })
    }

    static get propType() {
        return {
            films: React.PropTypes.array.isRequired,
            onSelect: React.PropTypes.func,
            onDatePickerChange: React.PropTypes.func,
            onTabsChange: React.PropTypes.func
        }
    }
}



/** WEBPACK FOOTER **
 ** ./src/components/VenuesCard/index.js
 **/
