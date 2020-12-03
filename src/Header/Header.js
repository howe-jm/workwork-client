import React from 'react';
import './Header.css';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className='logo-box'>
          <h1>WorkWork</h1>
          <img src={require('../images/workwork.png')} alt='Work Work Logo' />
        </div>
      </header>
    );
  }
}
