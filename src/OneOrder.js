import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import FullOrder from './FullOrder';


class OneOrder extends Component{

    constructor(props) {
        super(props);
        this.state ={
            reload: false
        }
        this.deleteOrderType = this.deleteOrderType.bind(this);
        this.showOrder = this.showOrder.bind(this);
    }

    showOrder() {
        return (
            <Link to={'/fullPost'}></Link>
        )
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
            <td>
                {this.props.order.date.slice(0, 10)}
            </td>
            <td className="text-center">
                {this.props.order.timeFrom + '-' + this.props.order.timeTo}
            </td>
            <td className="text-center">
                {
                    this.props.order.orderList.map(order => (
                        order + ' , ' 
                    ))
                }
            </td>
            <td className="text-center">
                {this.props.order.orderPrice}
            </td>
            <td className="text-center">
                {this.props.order.customer}
            </td>
            <td className="text-center">
                {this.props.order.customerNumber}
            </td>
            <td className="text-center">
                {this.props.order.receiver}
            </td>
            <td className="text-center">
                {this.props.order.receiverNumber}
            </td>
            <td className="text-center">
                {
                    this.props.order.street + ' , д. ' + this.props.order.house + ' , пд. ' + this.props.order.porch + ' , эт. ' + this.props.order.floor + ' , кв. ' + this.props.order.flat
                }
            </td>
            <td className="text-center">
                {this.props.order.paymentMethod}
            </td>
            <td className="text-center">
                {
                    this.props.order.poster ? (
                        <i class="fa fa-check" aria-hidden="true"></i>
                    ) : (
                        <i class="fa fa-times" aria-hidden="true"></i>
                    )
                }
            </td>
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
