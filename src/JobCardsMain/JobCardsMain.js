import React from 'react';
import './JobCardsMain.css';
import wwContext from '../wwContext';

export default class App extends React.Component {
  state = {
    JobCardsData: [],
    apiError: false,
    apiErrorMsg: '',
    loading: false,
  };

  static contextType = wwContext;

  render() {
    return (
      <div>
        <p> This is some test content </p>
      </div>
    );
  }
}
