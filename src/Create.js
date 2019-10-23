import React, {Component} from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import axios from 'axios';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: {
                date: '',
                timeFrom: '',
                timeTo: '',
                orderList: '',
                orderPrice: '',
                customer: '',
                customerNumber: '',
                receiver: '',
                receiverNumber: '',
                address: '',
                paymentMethod: '',
                notes: ''
            },
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        //this.datepickersSpellcheck = this.datepickersSpellcheck.bind(this);
        this.localizer = this.localizer.bind(this);
    }

    componentWillMount() {
        this.localizer();
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
        axios
            .post('https://flora-vitebsk.herokuapp.com/addOrder', this.state.orderData);
    }

    render() {
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
                                    data={[{id: 1, title:'букет1'}]}
                                    valueField="id"
                                    textField="title"
                                    onChange={value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                orderList: value.map(value => value.id).join(',')
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
                                <input type="text" className="form-control" name="customerNumber" value={this.state.orderData.customerNumber} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <h5>Имя получателя:</h5>
                                <input type="text" className="form-control" placeholder="Имя получателя" name="receiver" value={this.state.orderData.receiver} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <h5>Номер телефона получателя:</h5>
                                <input type="text" className="form-control" name="receiverNumber" value={this.state.orderData.receiverNumber} onChange={this.handleChange}/>
                            </div>
                            
                            <div className="form-group">
                                <h5>Адрес получателя: </h5>
                                <DropdownList filter 
                                    data={[{id: 1, title: 'Чапаева'}]} 
                                    placeholder={"Улица"} 
                                    valueField="id"
                                    textField="title"
                                    onChange={value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                address: value.id
                                            }
                                        });
                                        console.log(this.state.orderData);
                                    }}
                                />
                                <br/>
                                <div className="form-flex-spb ml-5px form-row">
                                    <input className="form-control col-2 ml-5px pl-10px" name="house" type="text" placeholder="Дом" onChange={this.handleChange}/>                                 
                                    <input className="form-control col-2 ml-5px pl-10px" name="entrance" type="text" placeholder="Подъезд" onChange={this.handleChange}/>
                                    <input className="form-control col-2 ml-5px pl-10px" name="flour" type="text" placeholder="Этаж" onChange={this.handleChange}/>                   
                                    <input className="form-control col-2 ml-5px pl-10px" name="flat" type="text" placeholder="Квартира" onChange={this.handleChange}/>                             
                                </div>
                            </div>

                            <div className="form-group">
                            <h5>Способ оплаты: </h5>
                            <Multiselect
                                    data={[{id: 1, title:'Карта'}]}
                                    valueField="title"
                                    textField="title"
                                    onChange={value => {
                                        this.setState({
                                            orderData: {
                                                ...this.state.orderData,
                                                paymentMethod: value.map(value => value.id).join(',')
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