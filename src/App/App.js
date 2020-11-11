import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import ErrorPage from '../ErrorBoundary/ErrorBoundary';
import wwContext from '../wwContext';
// To Do:
// import Header from '../Header/Header';
// import Sidebar from '../Sidebar/Sidebar';
import JobCardsMain from '../JobCardsMain/JobCardsMain';

export default class App extends React.Component {
  state = {
    userLoggedIn: 'smith-j',
    cardsDisplayed: 'jobs',
    cardsData: [],
    loading: false,
  };

  componentDidCatch() {
    this.setState({ loading: true });
  }

  cardsStateSwitch = (cardType) => {
    this.setState({ cardsDisplayed: cardType });
  };

  render() {
    const value = {
      userLoggedIn: this.state.userLoggedIn,
      cardsData: this.state.cardsData,
      cardStateSwitch: this.cardsStateSwitch,
    };
    return (
      <ErrorPage>
        <wwContext.Provider value={value}>
          <div>
            <JobCardsMain />
          </div>
        </wwContext.Provider>
      </ErrorPage>
    );
  }
}
