import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Header from './Header';
import List from './List';
import Create from './Create';
import Prices from './Prices';
import CreateProduct from './CreateProduct';
import LogIn from './LogIn';
import axios from 'axios';
import Edit from './Edit';
import Cookies from 'universal-cookie';
import FullOrder from './FullOrder';

const cookies = new Cookies();


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth: true
    }

    this.changeAuth = this.changeAuth.bind(this);
  }

  componentWillMount() {
    axios
      .get('https://flora-vitebsk.herokuapp.com/checkToken?token=' + cookies.get("Auth-Token"))
      .catch(
        error => {
          this.setState({
            isAuth: false
        })}
      )
  }

    changeAuth() {
      this.setState({
        isAuth: !this.state.isAuth
      });
    }

    render() {
      console.log(this.state.isAuth);
      return (
        <div className="App">
          <BrowserRouter>
          <Header isAuth={this.state.isAuth}/> 
            <Switch>
              {
                !this.state.isAuth ? (
                  <div>
                      <Route path={'/'} exact render={() => <LogIn 
                        changeAuth={this.changeAuth}
                        isAuth={this.state.isAuth}
                      />}/>
                  </div>
                  
                  ) : (
                    <div>
                      <Route path={'/create'} component={ Create }/>
                      <Route path={'/createproduct'} component={ CreateProduct }/>
                      <Route path={'/pricelist'} component={ Prices }/>
                      <Route path={'/edit/:id'} component={ Edit }/>
                      <Route path={'/list'} component={ List }/>
                      <Route path={'/fullorder/:id'} component={ FullOrder }/>
                    </div>
                )
              }                  
            </Switch>
          </BrowserRouter>
        </div>
      )
    }
}

export default App;
