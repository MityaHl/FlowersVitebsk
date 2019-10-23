import React, {Component} from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: '', 
            isResolve: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.promiseRequests = this.promiseRequests.bind(this);
        this.localizer = this.localizer.bind(this);
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
                    if(countQuery == 1) resolve();
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

    saveChanges(e) {
        e.preventDefault();
        console.log(this.state.order);
        axios
            .post('https://flora-vitebsk.herokuapp.com/changeOrder', this.state.order);
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
        return(
            <div className="create container">
                <form onSubmit={this.saveChanges}>
                            
                            <div className="form-group">    
                                <h5>Дата доставки:</h5>
                                <DateTimePicker
                                    time={false}
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
                                    <input type="text" name="timeFrom" className="form-control col-2 ml-5px" value={this.state.order.timeFrom} onChange={this.handleChange}/>
                                    <input type="text" name="timeTo" className="form-control col-2 ml-5px" value={this.state.order.timeTo} onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <h5>Заказ :</h5>
                                <Multiselect

                                    data={['букет1', 'букет2', 'роза']}
                                />
                            </div>

                            <div className="form-group">
                                <h5>Сумма заказа:</h5>
                                <input type="text" className="form-control" placeholder="Сумма заказа" name="orderPrice" value={this.state.order.cost} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <h5>Имя заказчика:</h5>
                                <input type="text" className="form-control" placeholder="Имя заказчика" name="customer" value={this.state.order.customer} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <h5>Номер телефона заказчика:</h5>
                                <input type="text" className="form-control" name="customerNumber" value={this.state.order.customerNumber} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <h5>Имя получателя:</h5>
                                <input type="text" className="form-control" placeholder="Имя получателя" name="receiver" value={this.state.order.receiver} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <h5>Номер телефона получателя:</h5>
                                <input type="text" className="form-control" name="receiverNumber" value={this.state.order.receiverNumber} onChange={this.handleChange}/>
                            </div>
                            
                            <div className="form-group">
                                <h5>Адрес получателя: </h5>
                                <DropdownList filter data={['Чапаева', 'Смоленская']} placeholder={"Улица"}/>
                                <br/>
                                <div className="form-flex-spb ml-5px form-row">
                                    <input className="form-control col-2 ml-5px pl-10px" name="title" type="text" placeholder="Дом"/>                                 
                                    <input className="form-control col-2 ml-5px pl-10px" name="title" type="text" placeholder="Подъезд"/>
                                    <input className="form-control col-2 ml-5px pl-10px" name="title" type="text" placeholder="Этаж"/>                   
                                    <input className="form-control col-2 ml-5px pl-10px" name="title" type="text" placeholder="Квартира"/>                             
                                </div>
                            </div>

                            <div className="form-group">
                            <h5>Способ оплаты: </h5>
                                <DropdownList filter data={['Карта', 'Наличные']}/>                                
                            </div>

                            <div className="form-group">
                                <h5 htmlFor="name">Примечание:</h5>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="note"  value={this.state.order.notes} onChange={this.handleChange}></textarea>
                            </div>
                            <div className="create-button">
                                <button className="btn btn-primary">Создать</button>
                            </div>
                        </form>
            </div>
        )
    }
}

export default Edit;