import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();



class Header extends Component{

  constructor(props) {
    super(props);
    this.showNothing = this.showNothing.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    axios
      .post('https://flora-vitebsk.herokuapp.com/loginOut?token=' + cookies.get("Auth-Token"))
      .then(
        response => {
          cookies.remove('Auth-Token');
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
                    <button className="btn btn-outline-light menu-btn"> Добавить заказ </button>
                </Link>
                <Link to={'/list'}>
                    <button className="btn btn-outline-light menu-btn"> Список заказов </button>
                </Link>
                <Link to={'/createproduct'}>
                    <button className="btn btn-outline-light menu-btn"> Добавить товар </button>
                </Link>
                <Link to={'/pricelist'}>
                    <button className="btn btn-outline-light menu-btn"> Список товаров </button>
                </Link>
                <button onClick={this.logOut} className="btn btn-outline-light menu-btn"> Выйти </button>
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
