import React, {Component} from 'react';
import axios from 'axios';
import OneOrder from './OneOrder';
import {Redirect} from "react-router-dom";
import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

const fileDownload = require('react-file-download');

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [], 
            types: [],
            isResolve: false,
            findBtn: '',
            isAuth: false,
            reload: false,
            idForDelete: '',
            searchName: '', 
            findByOrder: [],
            status: '', 
            payStatus: false,
            redirect: false, 
            logOut: false, 
            idForOpen: ''
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
        this.findByOrderList = this.findByOrderList.bind(this);
        this.findByStatus = this.findByStatus.bind(this);
        this.findByPayStatus = this.findByPayStatus.bind(this);
        this.changeRedirect = this.changeRedirect.bind(this);
        this.localizer = this.localizer.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
        this.changeLogOut = this.changeLogOut.bind(this);
    }

    changeLogOut() {
        this.setState({
            logOut: !this.state.logOut
        })
    }

    changeRedirect(id) {
        this.setState({
            redirect: true,
            idForDelete: id
        })
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
                    if(countQuery == 2) resolve();
                });
            axios
                .get('https://flora-vitebsk.herokuapp.com/getOrderTypes')
                .then(response => {
                    countQuery++;
                    this.setState({
                        types: response.data
                    });
                    if(countQuery == 2) resolve();
                });
        })
    }

    resetSearch() {
        axios
            .get('https://flora-vitebsk.herokuapp.com/getOrders')
            .then(response => {
                this.setState({
                    orders: response.data
                });
            });
    }

    localizer() {
        Moment.locale('ru');
        momentLocalizer();
    }
    
    findBtnValue(e) {
        this.setState({
            findBtn: e.target.value
        })
        console.log(this.state.findBtn)
    }
    
    componentWillMount() {
        this.localizer();
        console.log('vrtvtv', this.state.payStatus)
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
                <OneOrder order={order} changeReload={this.changeReload} changeRedirect={this.changeRedirect} changeId={this.changeId}/>
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
                    <div className="row find-input">
                        <input className="form-control col-8" type="text" onChange={this.findBtnValue} placeholder="Заказчик"/>
                        <button type="button" className="btn btn-warning col-2 offset-1 ml-5px" onClick={this.findByCustomer}>Найти</button>
                    </div>
                )
                
            case 'receiver':
                return  (
                    <div className="row find-input">
                        <input className="form-control col-8" type="text" onChange={this.findBtnValue} placeholder="Получатель"/>
                        <button type="button" className="btn btn-warning col-2 offset-1 ml-5px" onClick={this.findByReceiver}>Найти</button>
                    </div>
                )
            case 'customerNumber':
                return  (
                    <div className="row find-input">
                        <input className="form-control col-5" type="text" onChange={this.findBtnValue} placeholder="Номер телефона заказчика"/>
                        <button type="button" className="btn btn-warning col-2 offset-1 ml-5px" onClick={this.findByCustomerNumber}>Найти</button>
                    </div>
                )
            case 'receiverNumber':
                return  (
                    <div className="row find-input">
                        <input className="form-control col-5" type="text" onChange={this.findBtnValue} placeholder="Номер телефона получателя"/>
                        <button type="button" className="btn btn-warning col-2 offset-1 ml-5px" onClick={this.findByReceiverNumber}>Найти</button>
                    </div>
                ) 
            case 'status':
                return  (
                    <div className="row find-input">
                        <DropdownList
                            className="col-8 pl-0px" 
                            data={[{val: 'Принят', className: 'order-accepted'}, {val: 'Готов', className: 'order-ready'}, {val: 'Постер', className: 'order-done'}]}
                            textField="val"
                            valueField="className"
                            onChange={value => {
                                this.setState({
                                        status: value.className 
                                });
                            } }
                        />             
                        <button type="button" className="btn btn-warning col-2 offset-1" onClick={this.findByStatus}>Найти</button>
                    </div>
                ) 
                case 'payStatus':
                    return  (
                        <div className="row find-input">
                            <DropdownList
                                className="col-8 pl-0px" 
                                data={[{val: 'Оплачен', className: true}, {val: 'Не оплачен', className: false}]}
                                textField="val"
                                valueField="className"
                                onChange={value => {
                                    this.setState({
                                            payStatus: value.className 
                                    });
                                    console.log('ach', this.state.payStatus)
                                } }
                            />             
                            <button type="button" className="btn btn-warning col-2 offset-1" onClick={this.findByPayStatus}>Найти</button>
                        </div>
                    ) 
        }
    }

    findByOrderList() {
        let orderList = {
            orderList: this.state.findByOrder
        }
        axios
            .post('https://flora-vitebsk.herokuapp.com/findByOrderList', orderList)
            .then(
                response => {
                    this.setState({
                        orders: response.data
                    })
                }
            )
    }

    findByStatus() {
        axios
            .get('https://flora-vitebsk.herokuapp.com/findByStatus?status=' + this.state.status)
            .then(
                response => {
                    this.setState({
                        orders: response.data
                    })
                }
            )
    }

    findByPayStatus() {
        console.log('f',this.state.payStatus);
        axios
            .get('https://flora-vitebsk.herokuapp.com/findByPayStatus?payStatus=' + this.state.payStatus)
            .then(
                response => {
                    this.setState({
                        orders: response.data
                    })
                }
            )
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
        if(this.state.redirect) {
            return(
                <Redirect to={'/fullorder/' + this.state.idForDelete}/>
            )
        }

        return(

            <div>
                {
                    this.state.isResolve && this.state.orders instanceof Array ? (
                        <div>
                <div className="search container">
                        <h5 htmlFor="name">Поиск заказа:</h5>
                        <div className="row">
                            <select className="custom-select  col-8" onChange={this.selectSearch} name="searchName" placeholder="Тип поиска">
                                <option value="" disabled selected>Тип поиска</option>
                                <option value="customer">Имя заказчика</option>
                                <option value="receiver">Имя получателя</option>
                                <option value="customerNumber">Телефон заказчика</option>
                                <option value="receiverNumber">Телефон получателя</option>
                                <option value="status">Статус</option>
                                <option value="payStatus">Оплата</option>
                            </select>
                            <button type="button" className="col-2 offset-1 btn btn-primary" onClick={this.resetSearch}> Сброс</button>
                        </div>
                    

                    {
                        this.selectInput()
                    }
                                
                </div>
                <div className='table-div'>
                <div className="table-wrapper">
                    <table className="table table-bordered table-fixed">
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
                                    Сумма
                                </th>
                                <th>
                                    <i class="fas fa-dollar-sign"></i>
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
                        <tbody className='aaa'>
                            {
                                this.showPosts()
                            }
                        </tbody>
                    </table>
                </div>
                </div>
                
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