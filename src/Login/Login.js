import React from 'react';
import './Login.css';
import wwContext from '../wwContext';

export default class Login extends React.Component {
  static contextType = wwContext;

  render() {
    const currUser = this.context.userName;
    var userArray = ['jkrakz', 'smith-j', 'SamIamImaS', 'MagicWord', 'User5'];
    if (userArray) {
      var options = userArray.map((user, i) => {
        return (
          <option key={i} value={user}>
            {user}
          </option>
        );
      });
    }
    this.context.userName = userArray[0];
    return (
      <section className='login-page'>
        <h2>User Login Page</h2>
        <p>At the moment, this page simply</p>
        <p>demonstrates the ability to display</p>
        <p>data for different users, and is not</p>
        <p>fully functional as a login or</p>
        <p>authentication system.</p>
        <label>
          View User
          <div>
            <select
              value={currUser}
              name='currentUser'
              onChange={(e) => this.context.setUserName(e.target.value)}
            >
              <option key='-1' value=''>
                Select One
              </option>
              {options}
            </select>
          </div>
        </label>
      </section>
    );
  }
}
