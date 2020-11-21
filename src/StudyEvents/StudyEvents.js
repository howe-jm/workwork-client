import React from 'react';
import StudyContext from '../StudyContext';
import { format } from 'date-fns';
import config from '../config';

export default class StudyEvents extends React.Component {
  static contextType = StudyContext;

  handleDeleteEvent = (evt, card, eventId) => {
    evt.preventDefault();
    const username = this.context.userName;
    const caseCard = 'events';

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(
      `${config.API_ENDPOINT}/study/${username}/events/update/${eventId}`,
      requestOptions
    )
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res;
      })
      .then(() => this.context.cardsFunctions.wipeDataFromState(card, eventId, caseCard))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  render() {
    return this.context.StudyCardState.eventsCollapsed ? (
      <div></div>
    ) : this.props.events.length === 0 ? (
      <div className='no-events'>No events yet!</div>
    ) : (
      this.props.events.map((event) =>
        event.editing ? (
          <div className='event' key={event.id}>
            Editing this event
          </div>
        ) : (
          <div className='event' key={event.id}>
            <p>
              {format(event.dateAdded, 'M/DD/YYYY')}: {event.eventType}
            </p>
            <div className='event-buttons'>
              <form className='event-mod-form'>
                <div className='edit-icon'>
                  <button
                    className='card-button'
                    onClick={(evt) => this.handleDeleteEvent(evt, event.cardId, event.id)}
                  >
                    <img src={require('../images/delete.png')} alt='Delete' />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      )
    );
  }
}
