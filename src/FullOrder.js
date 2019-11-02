import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class FullOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: '', 
            isResolve: false,
            redirect: false
        }
        this.promiseRequests = this.promiseRequests.bind(this);
    }

    promiseRequests() {
        let countQuery = 0;
        return new Promise( resolve => {
            axios
            .get('https://flora-vitebsk.herokuapp.com/getOrderById?id=' + this.props.match.params.id)
                .then(response => {
                    countQuery++;
                    this.setState({
                        order: response.data
                    });
                    if(countQuery == 1) resolve();
                });
            }
        )
    }

    componentWillMount() {
        this.promiseRequests()
            .then(() => {
                this.setState({
                    isResolve: true
                });
            })
    }

    render() {
        return (
            this.state.isResolve ? (<div className="container">
            <ul class="list-group">
                <li class="list-group-item mt-10px">{'Дата: ' + this.state.order.date.slice(0,10)}</li>
                <li class="list-group-item mt-10px">{'Время: ' + this.state.order.timeFrom + ' - ' + this.state.order.timeTo}</li>
                <li class="list-group-item mt-10px">{'Заказ: ' + this.state.order.orderList}</li>
                <li class="list-group-item mt-10px">{'Сумма заказа: ' + this.state.order.orderPrice}</li>
                <li class="list-group-item mt-10px">{'Заказчик: ' + this.state.order.customer}</li>
                <li class="list-group-item mt-10px">{'Телефон заказчика: ' + this.state.order.customerNumberCode + this.state.order.customerNumber}</li>
                <li class="list-group-item mt-10px">{'Получатель: ' + this.state.order.receiver}</li>
                <li class="list-group-item mt-10px">{'Телефон получателя: ' + this.state.order.receiverNumberCode + this.state.order.receiverNumber}</li>
                <li class="list-group-item mt-10px">{'Адрес получателя: ' + this.state.order.street + ' , дом ' + this.state.order.house + ' , подъезд ' + this.state.order.porch + ' , этаж ' + this.state.order.floor + ' , квартира ' + this.state.order.flat}</li>
                <li class="list-group-item mt-10px">{'Тип оплаты: ' + this.state.order.paymentMethod}</li>
                <li class="list-group-item mt-10px">{this.state.order.poster ? ('Постер: Да') : ('Постер: Нет')}</li>
                <li class="list-group-item mt-10px">{this.state.order.payStatus ? ('Оплата: Да') : ('Оплата: Нет')}</li>
                <li class="list-group-item mt-10px">{this.state.order.status !='order-done' ? (
                    this.state.order.status == 'order-ready' ? ('Статус: готов') : ('Статус: принят')
                ) : ('Статус: доставлен')}</li>
                <li class="list-group-item">{'Примечание: ' + this.state.order.notes}</li>
            </ul>
        </div>) : (
            <div className="spinner-block">
                <div className="spinner-border">

                </div>
            </div>
        )
            
        )
    }
}

export default FullOrder