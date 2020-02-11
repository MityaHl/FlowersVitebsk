import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

class CreateCurier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curierData: {
                data: ''
            }, 
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveCurier = this.saveCurier.bind(this);
    }

    handleChange(e){
        this.setState({
            curierData: {
                ...this.state.curierData,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.curierData);
    }

    saveCurier(e) {
        e.preventDefault();
        axios
            .post('https://flora-vitebsk.herokuapp.com/addCourier', this.state.curierData)
            .then(
                setTimeout(()=>{
                    this.setState({
                        redirect: true
                    })
                }, 1000)
            )
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/list'/>;
        }

        return(
            <div className="create container">
                <form onSubmit={this.saveCurier}>
                            
                    <div className="form-group">
                        <h5>Информация о курьере:</h5>
                        <input type="text" className="form-control" name="data" placeholder="Информация о курьере" value={this.state.curierData.data} onChange={this.handleChange}/>
                    </div>

                    <div className="create-button">
                        <button className="btn btn-primary">Добавить курьера</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateCurier;