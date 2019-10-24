import React, {Component} from 'react';
import OneProduct from './OneProduct';
import axios from 'axios';

class Prices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderTypes: [], 
            isResolve: false,
            nameForDelete: ''
        }

        this.promiseRequests = this.promiseRequests.bind(this);
        this.showProducts = this.showProducts.bind(this);
        this.changeReload = this.changeReload.bind(this);
        this.changeId = this.changeId.bind(this);
    }

    showProducts() {
        return(
            this.state.orderTypes.map((orderType, index) => (
                <OneProduct orderType={orderType} changeReload={this.changeReload} changeId={this.changeId}/>
            ))
        )
    }

    changeId(name) {
        this.setState({
            nameForDelete: name
        })
    }

    changeReload() {
        this.setState({
            orderTypes: this.state.orderTypes.filter(orderType => orderType.name !== this.state.nameForDelete)
        })
    }

    promiseRequests() {
        let countQuery = 0;
        return new Promise( resolve => {
            axios
                .get('https://flora-vitebsk.herokuapp.com/getOrderTypes')
                .then(response => {
                    countQuery++;
                    this.setState({
                        orderTypes: response.data
                    });
                    if(countQuery == 1) resolve();
                });
        })
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
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th>
                                Название
                            </th>
                            <th>
                                Удаление
                            </th>
                        </tr>
                    </thead>
                <tbody>
                   {
                       this.showProducts()
                   }
                </tbody>
            </table>
        </div>
        )
    }
}

export default Prices;