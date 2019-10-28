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
            isAuth: false,
            reload: false,
            idForDelete: '',
            searchName: ''
        }

        this.promiseRequests = this.promiseRequests.bind(this);
        this.showPosts = this.showPosts.bind(this);
        this.findBtnValue = this.findBtnValue.bind(this);
        this.changeReload = this.changeReload.bind(this);
        this.changeId = this.changeId.bind(this);
        this.selectSearch = this.selectSearch.bind(this);
        this.selectInput = this.selectInput.bind(this);
        this.findByCustomer = this.findByCustomer.bind(this);
        this.findByReceiver = this.findByReceiver.bind(this);
        this.findByCustomerNumber = this.findByCustomerNumber.bind(this);
        this.findByReceiverNumber = this.findByReceiverNumber.bind(this);
    }

    changeId(id) {
        this.setState({
            idForDelete: id
        })
    }

    changeReload() {
        this.setState({
            orders: this.state.orders.filter(order => order.id !== this.state.idForDelete)
        })
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
        console.log(this.state.findBtn)
    }
    
    componentWillMount() {
        this.promiseRequests()
            .then(() => {
                this.setState({
                    isResolve: true
                });
            })
    }

    showPosts() {
        return(
            this.state.orders.map((order, index) => (
                <OneOrder order={order} changeReload={this.changeReload} changeId={this.changeId}/>
            ))
        )
    }

    selectSearch(e) {
        this.setState({
            searchName: e.target.value
        });
    }

    selectInput() {
        switch (this.state.searchName) {
            case 'customer':
                return  (
                    <div className="row  justify-content-around find-input">
                        <input className="form-control col-9" type="text" onChange={this.findBtnValue} placeholder="Заказчик"/>
                        <button type="button" className="btn btn-warning col-2" onClick={this.findByCustomer}>Найти</button>
                    </div>
                )
                
            case 'receiver':
                return  (
                    <div className="row  justify-content-around find-input">
                        <input className="form-control col-9" type="text" onChange={this.findBtnValue} placeholder="Получатель"/>
                        <button type="button" className="btn btn-warning col-2" onClick={this.findByReceiver}>Найти</button>
                    </div>
                )
            case 'customerNumber':
                return  (
                    <div className="row  justify-content-around find-input">
                        <input className="form-control col-9" type="text" onChange={this.findBtnValue} placeholder="Номер телефона заказчика"/>
                        <button type="button" className="btn btn-warning col-2" onClick={this.findByCustomerNumber}>Найти</button>
                    </div>
                )
            case 'receiverNumber':
                return  (
                    <div className="row  justify-content-around find-input">
                        <input className="form-control col-9" type="text" onChange={this.findBtnValue} placeholder="Номер телефона получателя"/>
                        <button type="button" className="btn btn-warning col-2" onClick={this.findByReceiverNumber}>Найти</button>
                    </div>
                ) 
        }
    }

    findByCustomer() {
        axios
        .get('https://flora-vitebsk.herokuapp.com/findByCustomer?customer=' + this.state.findBtn)
        .then(
            response => {
                this.setState({
                    orders: response.data
                })
            }
        )
    }

    findByCustomerNumber() {
        axios
        .get('https://flora-vitebsk.herokuapp.com/findByCustomerNumber?customerNumber=' + this.state.findBtn)
        .then(
            response => {
                this.setState({
                    orders: response.data
                })
            }
        )
    }

    findByReceiverNumber() {
        axios
        .get('https://flora-vitebsk.herokuapp.com/findByReceiverNumber?receiverNumber=' + this.state.findBtn)
        .then(
            response => {
                this.setState({
                    orders: response.data
                })
            }
        )
    }

    findByReceiver() {
        axios
        .get('https://flora-vitebsk.herokuapp.com/findByReceiver?receiver=' + this.state.findBtn)
        .then(
            response => {
                this.setState({
                    orders: response.data
                })
            }
        )
    }
    
    render() {

        console.log(this.state.orders);

        return(

            <div>
                {
                    this.state.isResolve && this.state.orders instanceof Array ? (
                        <div>
                <div className="search container">

                    <select className="custom-select my-1 mr-sm-2" onChange={this.selectSearch} name="searchName" placeholder="Тип поиска">
                        <option value="" disabled selected>Тип поиска</option>
                        <option value="customer">Имя заказчика</option>
                        <option value="receiver">Имя получателя</option>
                        <option value="customerNumber">Телефон заказчика</option>
                        <option value="receiverNumber">Телефон получателя</option>
                    </select>

                    {
                        this.selectInput()
                    }

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
                                Постер
                            </th>
                            <th>
                                Примечания
                            </th>
                            <th>
                                <i className="fas fa-edit fa-main"></i>
                            </th>
                            <th>
                                <i className="fas fa-trash-alt fa-main"></i>
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
                    ) : (
                        <div className="spinner-block">
                            <div className="spinner-border">

                            </div>
                        </div>
                    )
                }
            </div>
            
        )
    }
}

export default List;