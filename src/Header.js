import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component{

  constructor(props) {
    super(props);
    this.showNothing = this.showNothing.bind(this);
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
                <Link to={'/'}>
                    <button className="btn btn-outline-light menu-btn"> Список заказов </button>
                </Link>
                <Link to={'/createproduct'}>
                    <button className="btn btn-outline-light menu-btn"> Добавить товар </button>
                </Link>
                <Link to={'/pricelist'}>
                    <button className="btn btn-outline-light menu-btn"> Список товаров </button>
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
