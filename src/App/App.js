import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import wwContext from '../wwContext';
import ErrorPage from '../ErrorBoundary/ErrorBoundary';
// To Do:
import Header from '../Header/Header';
import JobCardsMain from '../JobCardsMain/JobCardsMain';
import StudyCardsMain from '../StudyCardsMain/StudyCardsMain.js';
import SideBar from '../Sidebar/Sidebar';
import Login from '../Login/Login';

export default class App extends React.Component {
  state = {
    userName: '',
    loading: false,
    error: false,
    errorMsg: '',
  };

  setUserName = (userName) => {
    this.setState({ userName });
    console.log(this.state.userName);
  };

  renderMainRoutes() {
    return (
      <Switch>
        <Route exact path='/:userName/jobs' component={JobCardsMain} />
        <Route exact path='/:userName/study' component={StudyCardsMain} />
        <Route path='/changeuser' component={Login} />
      </Switch>
    );
  }

  render() {
    const value = {
      userName: this.state.userName,
      setUserName: this.setUserName,
    };
    return (
      <wwContext.Provider value={value}>
        <ErrorPage>
          <div>
            <Header />
            <SideBar />
            <main>{this.renderMainRoutes()}</main>
          </div>
        </ErrorPage>
      </wwContext.Provider>
    );
  }
}
