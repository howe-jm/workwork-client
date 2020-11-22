import React from 'react';
import './Login.css';
import JobsContext from '../JobsContext';
import config from '../config';

export default class Login extends React.Component {
  state = {
    users: [],
    error: false,
    errorMsg: '',
    loading: false,
    newUser: {
      firstName: '',
      lastName: '',
      userName: '',
    },
    newUserError: false,
    newUserErrorMsg: '',
  };

  static contextType = JobsContext;

  componentDidMount() {
    this.setState({ loading: true });
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([fetch(`${config.API_ENDPOINT}/users/`, requestOptions)])
      .then(([users]) => {
        if (!users.ok) return users.json().then((e) => Promise.reject(e));
        return Promise.all([users.json()]);
      })
      .then(([users]) => this.setState({ users }))
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  }

  createNewUserForm = () => {
    return (
      <div>
        <form className='new-user-form'>
          <h3>Create New User</h3>
          <label htmlFor='firstName'>First Name: </label>
          <input
            name='firstName'
            onChange={(event) =>
              this.handleNewUserChange(event.target.name, event.target.value)
            }
          ></input>
          <label htmlFor='lastName'>Last Name: </label>
          <input
            name='lastName'
            onChange={(event) =>
              this.handleNewUserChange(event.target.name, event.target.value)
            }
          ></input>
          <label htmlFor='userName'>Choose a Unique Username: </label>
          <input
            name='userName'
            onChange={(event) =>
              this.handleNewUserChange(event.target.name, event.target.value)
            }
          ></input>
          <p className='error-text'>
            {this.state.newUserError && `${this.state.newUserErrorMsg}`}
          </p>
          <button
            name='submitUser'
            onClick={(e) => {
              e.preventDefault();
              this.handleSubmitNewUser();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  };

  handleNewUserChange = (name, value) => {
    let stateData = this.state.newUser;
    stateData[name] = value;
    this.setState({ newUser: stateData });
  };

  handleSubmitNewUser = () => {
    return this.state.users.find((user) => user.userName === this.state.newUser.userName)
      ? this.setState({ newUserError: true, newUserErrorMsg: 'Username already exists!' })
      : !this.state.newUser.firstName &&
        !this.state.newUser.lastName &&
        !this.state.newUser.userName
      ? this.setState({
          newUserError: true,
          newUserErrorMsg: 'Cannot submit an empty form!',
        })
      : !this.state.newUser.firstName ||
        !this.state.newUser.lastName ||
        !this.state.newUser.userName
      ? this.setState({
          newUserError: true,
          newUserErrorMsg: 'Must fill out all fields!',
        })
      : this.postNewUser(this.state.newUser);
  };

  postNewUser = (newUser) => {
    var myHeaders = new Headers();
    console.log('Ping!');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(newUser);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${config.API_ENDPOINT}/users`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((result) => {
        this.props.history.push(`/${result.userName}/jobs`);
      })
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  render() {
    const currUser = this.context.userName;
    let userArray = this.state.users.map((user) => user.userName);
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
      <section className='login-page'>
        <div className='login-text'>
          <h2>More work!</h2>
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
          <h4>Note:</h4>
          <p>
            A working login/password system is not yet fully implemented, and is a
            post-grading goal. However, the front and back end components of the app are
            coded to support multiple users. For the time being, you can create a new
            user, or choose to view an existing user in the user control form.
          </p>
        </div>
        <div className='user-select'>
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
          <div>{this.createNewUserForm()}</div>
        </div>
      </section>
    );
  }
}
