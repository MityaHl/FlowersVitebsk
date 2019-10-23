import React, {Component} from 'react';
import axios from 'axios';
import OneOrder from './OneOrder';
import {Redirect} from "react-router-dom";

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [], 
            isResolve: false,
            findBtn: '',
            isAuth: false
        }

        this.promiseRequests = this.promiseRequests.bind(this);
        this.showPosts = this.showPosts.bind(this);
        this.findBtnValue = this.findBtnValue.bind(this);
        this.findByNumber = this.findByNumber.bind(this);
        this.getCookie = this.getCookie.bind(this);
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([.$?|{}()[]\/+^])/g, '\$1') + '=([^;])'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    promiseRequests() {
        let countQuery = 0;
        return new Promise( resolve => {
            axios
                .get('https://flora-vitebsk.herokuapp.com/getOrders')
                .then(response => {
                    countQuery++;
                    this.setState({
                        orders: response.data
                    });
                    if(countQuery == 1) resolve();
                });
        })
    }
    
    findBtnValue(e) {
        this.setState({
            findBtn: e.target.value
        })
    }
    
    componentWillMount() {
        this.promiseRequests()
            .then(() => {
                this.setState({
                    isResolve: true
                });
            })
    }

    findByNumber() {
        console.log(this.state.findBtn);
        axios
            .get('https://flora-vitebsk.herokuapp.com/findByCustomerNumber?customerNumber=' + this.state.findBtn)
            .then(
                response => {
                    this.setState({
                        orders: response.data
                });
                }
            )
    }

    showPosts() {
        return(
            this.state.orders.map((order, index) => (
                <OneOrder order={order}/>
            ))
        )
    }


    render() {



        return(
            <div>
                <div className="search container">
                    <div className="row  justify-content-around">
                        <input className="form-control col-9" type="text" onChange={this.findBtnValue} placeholder="Номер телефона заказчика"/>
                        <button type="button" className="btn btn-warning col-2" onClick={this.findByNumber}>Найти</button>
                    </div>
                </div>
                 <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th>
                                Дата
                            </th>
                            <th>
                                Время
                            </th>
                            <th>
                                Заказ
                            </th>
                            <th>
                                Сумма
                            </th>
                            <th>
                                Заказчик
                            </th>
                            <th>
                                Телефон заказчика
                            </th>
                            <th>
                                Получатель
                            </th>
                            <th>
                                Телефон получателя
                            </th>
                            <th>
                                Адрес
                            </th>
                            <th>
                                Тип платы
                            </th>
                            <th>
                                Примечания
                            </th>
                            <th>
                                Изменение
                            </th>
                            <th>
                                Удаление
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.showPosts()
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List;