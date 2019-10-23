import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from './Header';
import List from './List';
import Create from './Create';
import Prices from './Prices';
import CreateProduct from './CreateProduct';
import LogIn from './LogIn';
import Edit from './Edit';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth: true
    }

    this.changeAuth = this.changeAuth.bind(this);
  }

  changeAuth() {
    this.setState({
      isAuth: !this.state.isAuth
    });
  }

    render() {
      return (
        <div className="App">
          <BrowserRouter>
          <Header isAuth={this.state.isAuth}/> 
            <Switch>
                <Route path={'/create'} component={ Create }/>
                <Route path={'/createproduct'} component={ CreateProduct }/>
                <Route path={'/pricelist'} component={ Prices }/>
                <Route path={'/edit/:id'} component={ Edit }/>
                <Route path={'/list'} component={ List }/>
                <Route path={'/'} exact render={() => <LogIn 
                  changeAuth={this.changeAuth}
                  isAuth={this.state.isAuth}
                />}/>
            </Switch>
          </BrowserRouter>
        </div>
      )
    }
}

export default App;
