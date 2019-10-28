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

    return (
        <tr className="text-center" className={this.props.order.status} >
            <td onClick={this.showOrder}>
                {this.props.order.date}
            </td>
            <td className="text-center" onClick={this.showOrder}>
                {this.props.order.timeFrom + '-' + this.props.order.timeTo}
            </td>
            <td className="text-center" onClick={this.showOrder}>
                {
                    this.props.order.orderList.map(order => (
                        order + ' ' 
                    ))
                }
            </td>
            <td className="text-center" onClick={this.showOrder}>
                {this.props.order.orderPrice}
            </td>
            <td className="text-center" onClick={this.showOrder}>
                {this.props.order.customer}
            </td>
            <td className="text-center" onClick={this.showOrder}>
                {
                    this.props.order.customerNumberCode + this.props.order.customerNumber
                }
            </td>
            <td className="text-center" onClick={this.showOrder}>
                {this.props.order.receiver}
            </td>
            <td className="text-center" onClick={this.showOrder}> 
                {
                    this.props.order.receiverNumberCode + this.props.order.receiverNumber
                }
            </td>
            <td className="text-center" onClick={this.showOrder}>
                {
                    this.props.order.street + ' , д. ' + this.props.order.house + ' , пд. ' + this.props.order.porch + ' , эт. ' + this.props.order.floor + ' , кв. ' + this.props.order.flat
                }
            </td>
            <td className="text-center" onClick={this.showOrder}>
                {this.props.order.paymentMethod}
            </td>
            <td className="text-center" onClick={this.showOrder}>
                {
                    this.props.order.poster ? (
                        <i class="fa fa-check" aria-hidden="true"></i>
                    ) : (
                        <i class="fa fa-times" aria-hidden="true"></i>
                    )
                }
            </td>
            <td className="text-center" onClick={this.showOrder}>
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
