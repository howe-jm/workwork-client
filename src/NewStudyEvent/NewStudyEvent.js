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
  };

  static contextType = StudyContext;

  handleAddNewEvent = (cardId, values) => {
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
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  verifyEventField = (cardId, eventObj) => {
    const { eventType } = eventObj;
    return !eventType
      ? this.setState({ eventObj: { newEventError: true } })
      : this.handleAddNewEvent(cardId, eventObj);
  };

  render() {
    const { handleEventChange, StudyCardState, cardsFunctions } = this.context;
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
              onChange={(event) =>
                handleEventChange(event.target.name, event.target.value)
              }
            />
          </p>
          <div className='buttons-container'>
            <div className='save-icon'>
              <img
                src={require('../images/cancel.png')}
                onClick={() => cardsFunctions.handleAddEventButton(cardId)}
                alt='Cancel'
              />
            </div>
            <div className='save-icon'>
              <img
                src={require('../images/save.png')}
                onClick={(e) =>
                  this.verifyEventField(this.props.cardId, StudyCardState.events)
                }
                alt='Save changes'
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
