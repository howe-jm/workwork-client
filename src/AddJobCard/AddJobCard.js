import React from 'react';
import JobsContext from '../JobsContext';
import config from '../config';

import './AddJobCard.css';

import 'react-datepicker/dist/react-datepicker.css';

var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
var regex = new RegExp(expression);

export default class AddJobCard extends React.Component {
  state = {
    newCard: {
      companyName: '',
      jobTitle: '',
      jobUrl: '',
    },
    validationError: false,
    validationMsg: '',
    error: '',
    errorMsg: '',
  };

  validateNewCardForm = () => {
    const { companyName, jobTitle, jobUrl } = this.state.newCard;
    return !companyName || companyName === ''
      ? this.setState({
          validationError: true,
          validationMsg: 'Must include a company name!',
        })
      : !jobTitle || jobTitle === ''
      ? this.setState({
          validationError: true,
          validationMsg: 'Must include a job title!',
        })
      : !jobUrl || jobUrl === '' || !jobUrl.match(regex)
      ? this.setState({ validationError: true, validationMsg: 'Invalid or missing URL!' })
      : this.handleSubmitNewCard();
  };

  static contextType = JobsContext;

  handleSubmitNewCard = () => {
    this.setState({ validationError: false });
    const userName = this.context.userName;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(this.state.newCard);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${config.API_ENDPOINT}/jobs/${userName}/cards/`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((result) => {
        result.events = [];
        result.contacts = [];
        result.comments = '';
        this.context.cardsFunctions.pushDataToState(result);
      })
      .then(() => {
        this.context.cardsFunctions.handleAddCardButton();
        this.setState({
          newCard: { companyName: '', jobTitle: '', jobUrl: '' },
        });
      })
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  handleNewCardChange = (name, value) => {
    this.setState({ validationError: false });
    let stateData = this.state.newCard;
    stateData[name] = value;
    this.setState({ newCard: stateData });
  };

  handleSubmitCard = (event) => {
    event.preventDefault();
    this.validateNewCardForm(event, this.state.newCard);
    console.log(this.state.validationError);
    console.log(this.state.validationMsg);
  };

  render() {
    return !this.props.addingCard ? (
      <div className='add-card-container'>
        <h3>Add New Job</h3>
        <div className='add-card-icon'>
          <button
            className='card-button'
            onClick={(event) => this.context.cardsFunctions.handleAddCardButton(event)}
          >
            <img src={require('../images/plus.png')} alt='Add new card' />
          </button>
        </div>
      </div>
    ) : (
      <div className='add-card-container'>
        <form className='new-card-form'>
          <label htmlFor='companyName'>Company Name:</label>
          <input
            name='companyName'
            onChange={(event) =>
              this.handleNewCardChange(event.target.name, event.target.value)
            }
            value={this.state.newCard.companyName}
          />
          <label htmlFor='jobTitle'>Title:</label>
          <input
            name='jobTitle'
            onChange={(event) =>
              this.handleNewCardChange(event.target.name, event.target.value)
            }
            value={this.state.newCard.jobTitle}
          />
          <label htmlFor='jobUrl'>URL:</label>
          <input
            name='jobUrl'
            onChange={(event) =>
              this.handleNewCardChange(event.target.name, event.target.value)
            }
            value={this.state.newCard.jobUrl}
          />
          {this.state.validationError && (
            <div className='card-error-text'>{this.state.validationMsg}</div>
          )}
          <div className='new-card-buttons'>
            <div className='edit-icon'>
              <button
                className='card-button'
                type='button'
                onClick={(event) =>
                  this.context.cardsFunctions.handleAddCardButton(event)
                }
              >
                <img src={require('../images/cancel.png')} alt='Add new card' />
              </button>
            </div>
            <div className='edit-icon'>
              <button
                className='card-button'
                onClick={(event) => this.handleSubmitCard(event)}
              >
                <img src={require('../images/save.png')} alt='Save changes' />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
