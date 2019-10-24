import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';


class OneProduct extends Component {

    constructor(props) {
        super(props);
        this.deleteOrderType = this.deleteOrderType.bind(this);
    }

    deleteOrderType(e) {
        e.preventDefault();
        console.log(this.props.orderType);
        axios
            .post('https://flora-vitebsk.herokuapp.com/deleteOrderType' , this.props.orderType)
            .then(
                response => {
                    this.props.changeId(this.props.orderType.name);
                    this.props.changeReload();
                }
            )
    }

    render() {
        return(
            <tr>
                <td className="text-center product-name col-7">
                {this.props.orderType.name}
            </td>
            <td className="text-center fa-product col-4">
                <i className="fas fa-trash-alt" onClick={this.deleteOrderType}></i>
            </td>
        </tr>
        )
    }

}

export default OneProduct;