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
    return (
      <section className='CardsDisplay'>
        <label>
          View User
          <div>
            <select
              value={currUser}
              name='currentUser'
              onChange={(e) => this.context.setUserName(e.target.value)}
            >
              {options}
            </select>
          </div>
        </label>
      </section>
    );
  }
}
