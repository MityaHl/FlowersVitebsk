import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import FullOrder from './FullOrder';
import {Redirect} from 'react-router-dom';

class OneOrder extends Component{

    constructor(props) {
        super(props);
        this.state ={
            reload: false,
            redirect: false
        }
        this.deleteOrderType = this.deleteOrderType.bind(this);
        this.showOrder = this.showOrder.bind(this);
    }


    showOrder() {
        this.props.changeRedirect(this.props.order.id);
    }

    deleteOrderType(e) {
        e.preventDefault();
        console.log(this.props.order);
        let isRemoving =  window.confirm ("Удалить закзаз?");
        if(isRemoving) {
            axios
            .post('https://flora-vitebsk.herokuapp.com/deleteOrder' , this.props.order)
            .then(
                response => {
                    this.props.changeId(this.props.order.id);
                    this.props.changeReload();
                }
            )
        }
    }

  render() {

    let street = this.props.order.street ? (this.props.order.street) : ('')
    let house = this.props.order.house ? ( '   д. ' + this.props.order.house) : ('')
    let porch = this.props.order.porch ? ( '   пд. ' + this.props.order.porch) : ('')
    let floor = this.props.order.floor ? ( '   эт. ' + this.props.order.floor) : ('')
    let flat = this.props.order.flat ? ( '   кв. ' + this.props.order.flat) : ('')

    return (
        <tr className="text-center" className={this.props.order.status} >
            <td className="date-tr">
                {this.props.order.date.split('-').reverse().join('-')}
            </td>
            <td className="text-center">
                {this.props.order.timeFrom + '-' + this.props.order.timeTo}
            </td>
            <td className="text-center">
                {
                    this.props.order.orderList
                }
            </td>
            <td className="text-center" >
                {this.props.order.customer}
            </td>
            <td className="text-center" >
                {
                    this.props.order.customerNumber ? (this.props.order.customerNumberCode + this.props.order.customerNumber) : ('')
                    
                }
            </td>
            <td className="text-center" >
                {this.props.order.receiver}
            </td>
            <td className="text-center" > 
                {
                    this.props.order.receiverNumber ? (this.props.order.receiverNumberCode + this.props.order.receiverNumber) : ('')
                }
            </td>
            <td className="text-center" >
                {
                    street + house + porch + floor + flat
                }
            </td>
            <td className="text-center" >
                {this.props.order.paymentMethod}
            </td>
            <td className="text-center" >
                {this.props.order.orderPrice}
            </td>
                {
                    this.props.order.payStatus ? (
                        <td className="pay-done"></td>
                    ) : (
                        <td className="pay-false"></td>
                    )
                }
            <td className="text-center">
                {this.props.order.notes}
            </td>
            <td className="text-center">
                <Link to={'/edit/' + this.props.order.id}>
                    <i className="fas fa-edit"></i>
                </Link>
            </td>
            <td className="text-center">
                <i className="fas fa-trash-alt" onClick={this.deleteOrderType}></i>
            </td>
        </tr>
      )
    }
}

export default OneOrder;
