import React from 'react';
import './Header.css';

import JobsContext from '../JobsContext';

export default class Header extends React.Component {
  static contextType = JobsContext;

  handleSubmit = (event) => {
    event.preventDefault();
    this.context.TESTchangeUser(this.state.userLoggedIn);
  };

  render() {
    return (
      <header>
        <h1>WorkWork Static-ish Client</h1>
      </header>
    );
  }
}
