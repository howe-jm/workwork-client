import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import wwContext from '../wwContext';
import ErrorPage from '../ErrorBoundary/ErrorBoundary';
import PageNotFound from '../PageNotFound/PageNotFound';
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
  };

  renderMainRoutes() {
    return (
      <Switch>
        <Route exact path='/:userName/jobs' component={JobCardsMain} />
        <Route exact path='/:userName/study' component={StudyCardsMain} />
        <Route exact path='/' component={Login} />
        <Route component={PageNotFound} />
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
            <main className='main-view'>{this.renderMainRoutes()}</main>
          </div>
        </ErrorPage>
      </wwContext.Provider>
    );
  }
}
