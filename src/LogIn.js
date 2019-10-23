import React, {Component} from 'react';
import axios from 'axios';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: {
                login: '',
                password: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        axios
            .post('', this.state.info)
            .then(
                this.props.changeAuth()
            )
    }

    handleChange(e){
        this.setState({
            info: {
                ...this.state.info,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.info);
    }

    render(){
        return(
            <div className="container mt-5">
                <form>
                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" className="form-control" name="login" placeholder="Enter email" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label >Пароль</label>
                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Войти</button>
                </form>
            </div>
        )
    }
}

export default LogIn;