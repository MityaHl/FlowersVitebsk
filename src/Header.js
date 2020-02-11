import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Redirect} from "react-router-dom";

const cookies = new Cookies();

class Header extends Component{

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.showNothing = this.showNothing.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    axios
      .post('https://flora-vitebsk.herokuapp.com/loginOut?token=' + cookies.get("Auth-Token"))
      .then(
        response => {
          cookies.remove('Auth-Token');
          setTimeout(()=>{
            this.props.changeAuth();
              
          }, 500)
          }
      )
  }

  showNothing() {
    return (
        <div className="spinner-block">
            <div className="spinner-border">

            </div>
        </div>
    )
}

  render() {
    return (
        <div className="header">
          <div className="header-info container">
            <div className="page-name">
              <div>Список заказов</div>
            </div>
            {
              this.props.isAuth ? (
                <div className="menu">
                <Link to={'/create'}>
                    <button className="btn btn-success menu-btn"> Добавить заказ </button>
                </Link>
                <Link to={'/list'}>
                    <button className="btn btn-success menu-btn"> Список заказов </button>
                </Link>
                <Link to={'/createcourier'}>
                    <button className="btn btn-success menu-btn"> Добавить курьера </button>
                </Link>
                <Link to={'/getfile'}>
                    <button className="btn btn-success menu-btn"> Получить файл </button>
                </Link>
                <Link to={'/'}>
                    <button className="btn btn-danger menu-btn log-out-btn" onClick={this.logOut}> Выйти </button>
                </Link>
            </div>
              ) : (
                <div></div>
              )
            }
          </div>
        </div>
      )
    }
}

export default Header;
