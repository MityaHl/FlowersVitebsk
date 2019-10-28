import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class FullOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: '', 
            isResolve: false,
            redirect: false
        }
        this.promiseRequests = this.promiseRequests.bind(this);
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
            }
        )
    }

    componentWillMount() {
        this.promiseRequests()
            .then(() => {
                this.setState({
                    isResolve: true
                });
            })
    }

    render() {
        return (
            <div>
                {this.state.order.notes}
            </div>
        )
    }
}

export default FullOrder