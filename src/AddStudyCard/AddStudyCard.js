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

  handleSubmitCard = () => {
    this.handleSubmitNewCard(this.state.newCard);
    this.context.cardsFunctions.handleAddCardButton();
    this.setState({ newCard: { companyName: '', studyTitle: '', studyUrl: '' } });
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
        <h4>New Card</h4>
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
