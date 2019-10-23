import React, {Component} from 'react';
import axios from 'axios';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {
                name: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
    }

    handleChange(e){
        this.setState({
            productData: {
                ...this.state.productData,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.productData);
    }

    saveOrder(e) {
        e.preventDefault();
        axios
            .post('https://flora-vitebsk.herokuapp.com/addOrderType', this.state.productData)
    }

    render() {
        return(
            <div className="create container">
                <form onSubmit={this.saveOrder}>
                            
                            <div className="form-group">
                                <h5>Название продукта:</h5>
                                <input type="text" className="form-control" name="name" placeholder="Название продукта" value={this.state.productData.name} onChange={this.handleChange}/>
                            </div>

                            <div className="create-button">
                                <button className="btn btn-primary">Добавить товар</button>
                            </div>
                        </form>
            </div>
        )
    }
}

export default Create;