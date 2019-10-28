import React, {Component} from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {}, 
            isResolve: false,
            redirect: false,
            types: [], 
            streets: [],
            payments: [], 
            isSelected: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.promiseRequests = this.promiseRequests.bind(this);
        this.localizer = this.localizer.bind(this);
        this.changePoster = this.changePoster.bind(this);
        this.checkSelected = this.checkSelected.bind(this);
    }

    checkSelected() {
        if(this.state.order.poster) {
            this.setState({
                isSelected: 'checked'
            });
        } else {
            this.setState({
                isSelected: ''
            });
        }
    }

    changePoster() {
        this.setState({
            order: {
                ...this.state.order,
                poster: !this.state.order.poster
            }
        });
        setTimeout(()=>{
            this.checkSelected();
        }, 100)  
    }

    localizer() {
        Moment.locale('ru');
        momentLocalizer();
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
                    if(countQuery == 4) resolve();
                });
            axios
            .get('https://flora-vitebsk.herokuapp.com/getStreets')
                .then(response => {
                    countQuery++;
                    this.setState({
                        streets: response.data
                    });
                    if(countQuery == 4) resolve();
                });
            axios
            .get('https://flora-vitebsk.herokuapp.com/getOrderTypes')
                .then(response => {
                    countQuery++;
                    this.setState({
                        types: response.data
                    });
                    if(countQuery == 4) resolve();
                });
            axios
            .get('https://flora-vitebsk.herokuapp.com/getPaymentMethods')
                .then(response => {
                    countQuery++;
                    this.setState({
                        payments: response.data
                    });
                    if(countQuery == 4) resolve();
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
            setTimeout(()=>{
                this.checkSelected();
            }, 100)        
    }

    saveChanges(e) {
        e.preventDefault();
        console.log(this.state.order);
        axios
            .post('https://flora-vitebsk.herokuapp.com/changeOrder', this.state.order)
            .then(
                response => {
                    this.setState({
                        redirect: true
                    })
                }
            )
    }

    handleChange(e){
        this.setState({
            order: {
                ...this.state.order,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.order);
    }

    render() {
        let order = this.state.order;
        if(this.state.redirect) {
            return <Redirect to='/list'/>
        }
        return(
            <div>
                {
                order instanceof Object && this.state.isResolve && this.state.types instanceof Array ? (
                    <div className="create container">
                    <form onSubmit={this.saveChanges}>
                                
                                <div className="form-group">    
                                    <h5>Дата доставки:</h5>
                                    <DateTimePicker
                                        time={false}
                                        value={new Date(this.state.order.date)}
                                        onChange={ value => {
                                            this.setState({
                                                order: {
                                                    ...this.state.order,
                                                    date: value
                                                }
                                            })
                                        } }
                                    />
                                </div>

                                <div className="form-group">
                                    <h5>Время доставки (от/до):</h5>
                                    <div className="form-row">  
                                        <input type="time" name="timeFrom" className="form-control col-2 ml-5px" value={this.state.order.timeFrom} onChange={this.handleChange}/>
                                        <input type="time" name="timeTo" className="form-control col-2 ml-5px" value={this.state.order.timeTo} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <h5>Заказ :</h5>
                                                                        
                                    <Multiselect
                                        data={this.state.types}
                                        value={this.state.order.orderList}
                                        valueField="name"
                                        textField="name"
                                        onChange={ value => {
                                            this.setState({
                                                order: {
                                                    ...this.state.order,
                                                    orderList: value.map((item) => {
                                                        return item.name;
                                                    })
                                                }
                                            })
                                        } }
                                    />
                                </div>

                                <div className="form-group">
                                    <h5>Сумма заказа:</h5>
                                    <input type="text" className="form-control" placeholder="Сумма заказа" name="orderPrice" value={this.state.order.orderPrice} onChange={this.handleChange}/>
                                </div>

                                <div className="form-group">
                                    <h5>Имя заказчика:</h5>
                                    <input type="text" className="form-control" placeholder="Имя заказчика" name="customer" value={this.state.order.customer} onChange={this.handleChange}/>
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
                                                    order: {
                                                        ...this.state.order,
                                                        customerNumberCode: value
                                                    }
                                                });
                                            }}
                                        />
                                    <input type="text" className="form-control col-5 ml-5" name="customerNumber" value={this.state.order.customerNumber} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <h5>Имя получателя:</h5>
                                    <input type="text" className="form-control" placeholder="Имя получателя" name="receiver" value={this.state.order.receiver} onChange={this.handleChange}/>
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
                                                    order: {
                                                        ...this.state.order,
                                                        receiverNumberCode: value
                                                    }
                                                });
                                            }}
                                        />
                                        <input type="text" className="form-control col-5 ml-5" name="receiverNumber" value={this.state.order.receiverNumber} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <h5>Адрес получателя: </h5>
                                    <DropdownList filter 
                                    data={this.state.streets} 
                                    value={this.state.order.street} 
                                    valueField="name"
                                    textField="name"
                                    placeholder={"Улица"}
                                    onChange={ value => {
                                        this.setState({
                                            order: {
                                                ...this.state.order,
                                                street: value
                                            }
                                        })
                                    } }
                                    />
                                    <br/>
                                    <div className="form-flex-spb ml-5px form-row">
                                        <input className="form-control col-2 ml-5px pl-10px" name="house" value={this.state.order.house} type="text" placeholder="Дом" onChange={this.handleChange}/>                                 
                                        <input className="form-control col-2 ml-5px pl-10px" name="porch" value={this.state.order.porch}  type="text" placeholder="Подъезд" onChange={this.handleChange}/>
                                        <input className="form-control col-2 ml-5px pl-10px" name="floor" value={this.state.order.floor} type="text" placeholder="Этаж" onChange={this.handleChange}/>                   
                                        <input className="form-control col-2 ml-5px pl-10px" name="flat" value={this.state.order.flat} type="text" placeholder="Квартира" onChange={this.handleChange}/>                             
                                    </div>
                                </div>

                                <div className="form-group">
                                <h5>Способ оплаты: </h5>
                                    <DropdownList filter 
                                    data={this.state.payments}
                                    value={this.state.order.paymentMethod}
                                    valueField="name"
                                    textField="name"
                                    onChange={ value => {
                                        this.setState({
                                            order: {
                                                ...this.state.order,
                                                paymentMethod: value.name
                                            }
                                        })
                                    } }
                                    />                                
                                </div>

                                <div className="form-group">
                                <h5 htmlFor="name">Постер:</h5>
                                <input className="form-control ml-5px pl-10px" checked={this.state.isSelected} name="poster" value={this.state.order.poster} type="checkbox" onChange={this.changePoster}/>                                 
                            </div>
                            <div className="form-group">
                                <h5 htmlFor="name">Статус заказа:</h5>
                                <DropdownList
                                    value={this.state.order.status}
                                    data={[{val: 'Принят', className: 'order-accepted'}, {val: 'Готов', className: 'order-ready'}, {val: 'Доставлен', className: 'order-done'}]}
                                    textField="val"
                                    valueField="className"
                                    onChange={value => {
                                        this.setState({ 
                                            order: {
                                                ...this.state.order,
                                                status: value.className
                                            }
                                        });
                                    } }
                                />                                        
                            </div>

                                <div className="form-group">
                                    <h5 htmlFor="name">Примечание:</h5>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="notes"  value={this.state.order.notes} onChange={this.handleChange}></textarea>
                                </div>
                                <div className="create-button">
                                    <button className="btn btn-primary">Изменить</button>
                                </div>
                            </form>
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

export default Edit;