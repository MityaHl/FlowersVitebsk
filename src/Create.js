import React, {Component} from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {Redirect} from "react-router-dom";
import axios from 'axios';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: {
                date: '',
                timeFrom: '',
                timeTo: '',
                orderList: [],
                orderPrice: '',
                customer: '',
                customerNumber: '',
                customerNumberCode: '+375',
                receiverNumberCode: '+375',
                receiver: '',
                receiverNumber: '',
                street: '',
                house: '',
                porch: '', 
                floor: '',
                flat: '',
                paymentMethod: '',
                notes: '',
                status: '',
                poster: false
            },
            redirect: false, 
            types: [], 
            streets: [],
            payments: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        //this.datepickersSpellcheck = this.datepickersSpellcheck.bind(this);
        this.localizer = this.localizer.bind(this);
        this.changePoster = this.changePoster.bind(this);
        this.promiseRequests = this.promiseRequests.bind(this);
    }

    changePoster() {
        this.setState({
            orderData: {
                ...this.state.orderData,
                poster: !this.state.orderData.poster
            }
        });
        console.log(this.state.orderData.poster)
    }



    promiseRequests() {
        let countQuery = 0;
        return new Promise( resolve => {
            axios
            .get('https://flora-vitebsk.herokuapp.com/getStreets')
                .then(response => {
                    countQuery++;
                    this.setState({
                        streets: response.data
                    });
                    if(countQuery == 3) resolve();
                });
            axios
            .get('https://flora-vitebsk.herokuapp.com/getOrderTypes')
                .then(response => {
                    countQuery++;
                    this.setState({
                        types: response.data
                    });
                    if(countQuery == 3) resolve();
                });
            axios
            .get('https://flora-vitebsk.herokuapp.com/getPaymentMethods')
                .then(response => {
                    countQuery++;
                    this.setState({
                        payments: response.data
                    });
                    if(countQuery == 3) resolve();
                });
        })
    }

    componentWillMount() {
        this.localizer();

        this.promiseRequests()
            .then(() => {
                this.setState({
                    isResolve: true
                });
            })
    }

    localizer() {
        Moment.locale('ru');
        momentLocalizer();
    }

    handleChange(e){
        this.setState({
            orderData: {
                ...this.state.orderData,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.orderData);
    }

    saveOrder(e) {
        e.preventDefault();
        console.log(this.state.orderData);
        axios
            .post('https://flora-vitebsk.herokuapp.com/addOrder', this.state.orderData)
            .then(
                setTimeout(()=>{
                    this.setState({
                        redirect: true
                    })
                }, 1000)
                
            )
            
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/list'/>;
        }

        return(
            <div className="create container">
                <form onSubmit={this.saveOrder}>
                            
                            <div className="form-group">
                                <h5>Дата доставки:</h5>
                                <DateTimePicker
                                    time={false}
                                    onChange={ value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                date: value
                                            }
                                        })
                                        console.log(this.state.orderData);
                                    } }
                                />
                            </div>

                            <div className="form-group">
                                <h5>Время доставки (от/до):</h5>
                                <div className="form-row">  
                                    <input type="time" name="timeFrom" className="form-control col-2 ml-5px" value={this.state.orderData.timeFrom} onChange={this.handleChange}/>
                                    <input type="time" name="timeTo" className="form-control col-2 ml-5px" value={this.state.orderData.timeTo} onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <h5>Заказ :</h5>
                                <Multiselect
                                    data={this.state.types}
                                    valueField="name"
                                    textField="name"
                                    onChange={value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                orderList: value.map(value => value.name)
                                            } 
                                        });
                                        console.log(this.state.orderData);
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <h5>Сумма заказа:</h5>
                                <input type="text" className="form-control" placeholder="Сумма заказа" name="orderPrice" value={this.state.orderData.orderPrice} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <h5>Имя заказчика:</h5>
                                <input type="text" className="form-control" placeholder="Имя заказчика" name="customer" value={this.state.orderData.customer} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <h5>Номер телефона заказчика:</h5>
                                <div className="row">
                                <DropdownList
                                    className="col-2 ml-5px pl-10px" 
                                    data={['+375', '+777']} 
                                    defaultValue={'+375'}
                                    placeholder={"Улица"} 
                                    onChange={value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                customerNumberCode: value
                                            }
                                        });
                                        console.log(this.state.orderData);
                                    }}
                                />
                                    <input type="text" className="form-control col-5 ml-5" name="customerNumber" value={this.state.orderData.customerNumber} onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <h5>Имя получателя:</h5>
                                <input type="text" className="form-control" placeholder="Имя получателя" name="receiver" value={this.state.orderData.receiver} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <h5>Номер телефона получателя:</h5>
                                <div className="row">
                                <DropdownList
                                    className="col-2 ml-5px pl-10px"   
                                    data={['+375', '+777']} 
                                    defaultValue={'+375'}
                                    placeholder={"Улица"} 
                                    onChange={value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                receiverNumberCode: value
                                            }
                                        });
                                        console.log(this.state.orderData);
                                    }}
                                />
                                    <input type="text" className="form-control col-5 ml-5" name="receiverNumber" value={this.state.orderData.receiverNumber} onChange={this.handleChange}/>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <h5>Адрес получателя: </h5>
                                <DropdownList filter 
                                    data={this.state.streets} 
                                    placeholder={"Улица"} 
                                    valueField="name"
                                    textField="name"
                                    onChange={value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                street: value.name
                                            }
                                        });
                                        console.log(this.state.orderData);
                                    }}
                                />
                                <br/>
                                <div className="form-flex-spb ml-5px form-row">
                                    <input className="form-control col-2 ml-5px pl-10px" name="house" value={this.state.orderData.house} type="text" placeholder="Дом" onChange={this.handleChange}/>                                 
                                    <input className="form-control col-2 ml-5px pl-10px" name="porch" value={this.state.orderData.porch} type="text" placeholder="Подъезд" onChange={this.handleChange}/>
                                    <input className="form-control col-2 ml-5px pl-10px" name="floor" value={this.state.orderData.floor} type="text" placeholder="Этаж" onChange={this.handleChange}/>                   
                                    <input className="form-control col-2 ml-5px pl-10px" name="flat" value={this.state.orderData.flat} type="text" placeholder="Квартира" onChange={this.handleChange}/>                             
                                </div>
                            </div>

                            <div className="form-group">
                            <h5>Способ оплаты: </h5>
                            <DropdownList
                                    data={this.state.payments}
                                    valueField="name"
                                    textField="name"
                                    onChange={value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                paymentMethod: value.name
                                            }
                                        });
                                        console.log(this.state.orderData);
                                    } }
                                />                                
                            </div>
                            <div className="form-group">
                                <h5 htmlFor="name">Постер:</h5>
                                <input className="form-control ml-5px pl-10px" name="poster" value={this.state.orderData.poster} type="checkbox" onChange={this.changePoster}/>                                 
                            </div>
                            <div className="form-group">
                                <h5 htmlFor="name">Статус заказа:</h5>
                                <DropdownList
                                    data={[{val: 'Принят', className: 'order-accepted'}, {val: 'Готов', className: 'order-ready'}, {val: 'Доставлен', className: 'order-done'}]}
                                    textField="val"
                                    valueField="className"
                                    onChange={value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                status: value.className
                                            }
                                        });
                                        console.log(this.state.orderData);
                                    } }
                                />                                        
                            </div>
                            <div className="form-group">
                                <h5 htmlFor="name">Примечание:</h5>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="notes"  value={this.state.orderData.notes} onChange={this.handleChange}></textarea>
                            </div>
                            <div className="create-button">
                                <button className="btn btn-primary">Добавить заказ</button>
                            </div>
                        </form>
            </div>
        )
    }
}

export default Create;