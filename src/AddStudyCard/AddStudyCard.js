import React from 'react';
import StudyContext from '../StudyContext';
import config from '../config';

import './AddStudyCard.css';

import 'react-datepicker/dist/react-datepicker.css';

export default class AddStudyCard extends React.Component {
  state = {
    newCard: {
      trainingName: '',
      trainingUrl: '',
    },
    error: '',
    errorMsg: '',
  };

  static contextType = StudyContext;

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

    fetch(`${config.API_ENDPOINT}/study/${userName}/cards/`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((result) => {
        result.events = [];
        result.comments = [];
        this.context.cardsFunctions.pushDataToState(result);
      })
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  handleNewCardChange = (name, value) => {
    let stateData = this.state.newCard;
    stateData[name] = value;
    this.setState({ newCard: stateData });
  };

  handleSubmitCard = (event) => {
    event.preventDefault();
    this.handleSubmitNewCard(this.state.newCard);
    this.context.cardsFunctions.handleAddCardButton();
    this.setState({ newCard: { companyName: '', studyTitle: '', studyUrl: '' } });
  };

  render() {
    return !this.props.addingCard ? (
      <div className='add-study-card-container'>
        <h3>Add New Card</h3>
        <div className='add-card-icon'>
          <img
            src={require('../images/plus.png')}
            onClick={() => this.context.cardsFunctions.handleAddCardButton()}
            alt='Add new card'
          />
        </div>
      </div>
    ) : (
      <div className='add-study-card-container'>
        <form className='new-card-form'>
          <label htmlFor='trainingName'>Name:</label>
          <input
            name='trainingName'
            onChange={(event) =>
              this.handleNewCardChange(event.target.name, event.target.value)
            }
            value={this.state.newCard.companyName}
          />
          <label htmlFor='trainingUrl'>URL:</label>
          <input
            name='trainingUrl'
            onChange={(event) =>
              this.handleNewCardChange(event.target.name, event.target.value)
            }
            value={this.state.newCard.studyUrl}
          />
          <div className='new-card-buttons'>
            <div className='edit-icon'>
              <button
                type='button'
                className='card-button'
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
