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
        <div className='login-text'>
          <h3>Welcome to WorkWork, a Job and Training Tracking App!</h3>
          <p>
            I believe it's of the utmost importance that students and recent college and
            bootcamp graduates keep up to date on both their training and their job leads,
            and so I've created an app that will make it simpler and easier to do both in
            a commonly recognized card format.
          </p>
          <p>
            In the Job Cards section, users can add, edit, and remove potential job leads!
            In addition, they can add contact information for that job, as well as keep
            track of various events, such as submitting an application/resume, getting
            callbacks and interviews, and making follow-up calls. They can additionally
            add any comments they'd like about that job. This makes it easier to keep
            track of all the information the user has about a particular job.
          </p>
          <p>
            The Study Cards section works in much the same way, except it keeps track of
            individual study items such as books, videos, training courses, and even
            bootcamps and classes, if the user desires.
          </p>
          <p>
            <h4>Note:</h4> A working login/password system is not yet fully implemented,
            and is a post-grading goal. However, the front and back end components of the
            app are coded to support multiple users. For the time being, you can simply
            choose to view/change data for a vareity of sample users below!
          </p>
        </div>
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
