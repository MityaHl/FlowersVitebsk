import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';


class OneOrder extends Component{

    constructor(props) {
        super(props);
        this.deleteOrderType = this.deleteOrderType.bind(this);
    }

    deleteOrderType(e) {
        e.preventDefault();
        console.log(this.props.order);
        axios
            .post('https://flora-vitebsk.herokuapp.com/deleteOrder' , this.props.order)
    }

  render() {
    return (
        <tr className="text-center">
            <td>
                {this.props.order.date}
            </td>
            <td className="text-center">
                {this.props.order.timeFrom + '-' + this.props.order.timeTo}
            </td>
            <td className="text-center">
                {this.props.order.orderList}
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
                {this.props.order.address}
            </td>
            <td className="text-center">
                {this.props.order.paymentMethod}
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
