import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import wwContext from '../wwContext';

export default class Sidebar extends React.Component {
  static contextType = wwContext;

  render() {
    const userName = this.context.userName;
    const jobsLink = `/${userName}/jobs`;
    const studyLink = `/${userName}/study`;
    return userName ? (
      <div>
        <nav className='sidebar'>
          <div className='logo-box'>Welcome, {userName}!</div>
          <ul>
            <li>
              <Link to={jobsLink}>Jobs Cards</Link>
            </li>
            <li>
              <Link to={studyLink}>Study Cards</Link>
            </li>
            <li>
              <Link to='/'>Change User</Link>
            </li>
          </ul>
        </nav>
      </div>
    ) : (
      <div>
        <nav className='sidebar'>
          <div className='logo-box'>Select a user to continue!</div>
        </nav>
      </div>
    );
  }
}
