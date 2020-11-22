import React from 'react';
import StudyContext from '../StudyContext';
import { format } from 'date-fns';
import config from '../config';

export default class NewStudyEvent extends React.Component {
  state = {
    newEvent: {
      contactType: '',
    },
    error: false,
    errorMsg: '',
    validationError: false,
    validationMsg: '',
  };

  static contextType = StudyContext;

  handleAddNewEvent = (cardId, values) => {
    this.setState({ newEvent: { eventType: '' } });
    const username = this.context.userName;
    const caseCard = 'events';
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(values);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${config.API_ENDPOINT}/study/${username}/events/${cardId}`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((result) =>
        this.context.cardsFunctions.pushDataToState(result, cardId, caseCard)
      )
      .then(() => this.context.handleEventChange('eventType', ''))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  verifyEventField = (event, cardId, eventObj) => {
    event.preventDefault();
    const { eventType } = eventObj;
    return !eventType || eventType === ''
      ? this.setState({
          validationError: true,
          validationMsg: 'Cannot submit empty event!',
        })
      : this.handleAddNewEvent(cardId, eventObj);
  };

  render() {
    const { handleEventChange, StudyCardState, addEventButtonListner } = this.context;
    const { cardId } = this.props;
    return (
      <div className='event'>
        <h4>New Event</h4>
        <form className='edit-form'>
          <p>Date: {format(new Date(), 'M/DD/YYYY')}</p>
          <label htmlFor='contactName'>Name: </label>
          <p>
            <input
              name='eventType'
              placeholder='Resume Sent, Callback, etc.'
              value={this.context.StudyCardState.eventType}
              onChange={(event) => {
                this.setState({ validationError: false });
                return handleEventChange(event.target.name, event.target.value);
              }}
            />
          </p>
          {this.state.validationError && (
            <div className='error-text'>{this.state.validationMsg}</div>
          )}
          <div className='buttons-container'>
            <div className='save-icon'>
              <button
                className='card-button'
                onClick={(evt) => addEventButtonListner(evt, cardId)}
              >
                <img src={require('../images/cancel.png')} alt='Cancel' />
              </button>
            </div>
            <div className='save-icon'>
              <button
                className='card-button'
                onClick={(e) =>
                  this.verifyEventField(e, this.props.cardId, StudyCardState.events)
                }
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
