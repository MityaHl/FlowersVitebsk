import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: {
                login: '',
                password: ''
            }, 
            isRight: true,
            token: '',
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        
    }

    handleSubmit() {
        axios
            .post('https://flora-vitebsk.herokuapp.com/login', this.state.info)
            .then(
                response => {
                    this.setState({
                        token : response.data.value,
                        redirect: true
                    });
                    this.props.changeAuth();
                    document.cookie = "Auth-Token=" + this.state.token;
                }             
            )
            .catch( error => {
                this.setState({
                    isRight: false
                })
                console.log(this.state.isRight);
            } )
    }

    handleChange(e){
        this.setState({
            info: {
                ...this.state.info,
                [e.target.name]: e.target.value
            }
        });
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to='/list'/>;
        }
        return(
            <div className="container mt-5">
                <form>
                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" className="form-control" name="login" placeholder="Login" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label >Пароль</label>
                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange}/>
                        {
                            !this.state.isRight ? (
                                <div className="invalid-data mt-2">
                                    Проверьте логин или пароль
                                </div>
                            ) : ('')
                        }
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Войти</button>
                </form>
            </div>
        )
    }
}

export default LogIn;