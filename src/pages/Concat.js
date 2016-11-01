/**
 * Created by lusiwei on 2016/10/13.
 */
'use strict';

import React from 'react'
import { connect } from 'react-redux'
import { store } from '../stores'

import {
    Card, CardTitle, CardText,
    TextField,
    FlatButton
} from 'material-ui'

import Order from '../models/Order'

import config from '../config/base'

import { fetchCreateOrder, fetchOnlinePay } from '../actions/orders'

class Concat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            shouldShowPhoneError: false,
            orders: this.props.params.type === 'buy-now' ? [this.props.location.state.order] : this.props.cart_orders
        };
        this.styles = {
            flatButton: {
                height: '4rem',
                lineHeight: '4rem'
            }
        }
    }
    render() {
        return (
            <div className="content">
                <Card className="card">
                    <CardTitle title="联系方式" subtitle="请仔细确认您的联系信息"/>
                    <CardText style={{textAlign: 'center'}}>
                        <TextField floatingLabelText="姓名" value={this.state.name}
                                   onChange={(_, value) => this.handleInputChanged('name', value)} /> <br/>
                        <TextField style={{textAlign: 'left'}} value={this.state.phone} floatingLabelText="手机号码"
                                   onChange={(_, value) => this.handleInputChanged('phone', value)}
                                   errorText={this.state.phone.length != 11 ? '请核对手机号码' : ''} />
                    </CardText>
                </Card>
                <Card className="card">
                    <CardTitle title="支付方式" subtitle="支付后您的订单信息将不能更改" />
                    <CardText style={{textAlign: 'center'}}>
                        <FlatButton style={this.styles.flatButton}
                                    label={<i style={{fontSize: '3rem', color: 'rgb(99, 169, 232)'}}
                                    className="iconfont icon-alipay" />}
                                    onClick={() => this.handlePayButtonClicked(config.payType.alipay)}
                        />
                        <FlatButton style={this.styles.flatButton}
                                    label={<i style={{fontSize: '3.5rem', color: 'rgb(127, 193, 67)'}}
                                    className="iconfont icon-wechat" />}
                                    onClick={() => this.handlePayButtonClicked(config.payType.wechat)}
                        />
                        <FlatButton style={this.styles.flatButton}
                                    label={<i style={{fontSize: '3rem'}}
                                    className="iconfont icon-yinlian" />}
                                    onClick={() => this.handlePayButtonClicked(config.payType.unionPay)}
                        />
                    </CardText>
                </Card>
            </div>
        )
    }

    handleInputChanged(type, value) {
        this.setState({[type]: value});
    }
    handlePayButtonClicked(type) {
        if (this.props.params.type === 'buy-now') {
            this.handleBuyNowPay(type);
        }
    }
    handleBuyNowPay(type) {
        store.dispatch(fetchCreateOrder(Order.clone(this.props.location.state.order),
            this.state.phone, this.state.name))
            .then(data => {
                if (data.error) {
                    alert('服务器异常');
                } else {
                    location.href = config.route.onlinePay(type, data.shopping_token);
                }
            });
    }
}

function mapStateToProps(state) {
    return {
        cart_orders: state.orders
    }
}

export default connect(mapStateToProps)(Concat);
