import React from 'react';
import JobsContext from '../JobsContext';
import config from '../config';

import './AddJobCard.css';

import 'react-datepicker/dist/react-datepicker.css';

export default class AddJobCard extends React.Component {
  state = {
    newCard: {
      companyName: '',
      jobTitle: '',
      jobUrl: '',
    },
    error: '',
    errorMsg: '',
  };

  static contextType = JobsContext;

  handleSubmitNewCard = (values) => {
    const userName = this.context.userName;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(values);

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
      .then((result) => this.context.cardsFunctions.pushDataToState(result))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  handleNewCardChange = (name, value) => {
    let stateData = this.state.newCard;
    stateData[name] = value;
    this.setState({ newCard: stateData });
  };

  handleSubmitCard = () => {
    this.handleSubmitNewCard(this.state.newCard);
    this.context.cardsFunctions.handleAddCardButton();
    this.setState({ newCard: { companyName: '', jobTitle: '', jobUrl: '' } });
  };

  render() {
    return !this.props.addingCard ? (
      <div className='add-card-icon'>
        <img
          src={require('../images/plus.png')}
          onClick={() => this.context.cardsFunctions.handleAddCardButton()}
          alt='Add new card'
        />
      </div>
    ) : (
      <div>
        <h4>New Contact</h4>
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
          <div className='new-card-buttons'>
            <div className='edit-icon'>
              <img
                src={require('../images/cancel.png')}
                onClick={() => this.context.cardsFunctions.handleAddCardButton()}
                alt='Add new card'
              />
            </div>
            <div className='edit-icon'>
              <img
                src={require('../images/save.png')}
                onClick={() => this.handleSubmitCard()}
                alt='Save changes'
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
