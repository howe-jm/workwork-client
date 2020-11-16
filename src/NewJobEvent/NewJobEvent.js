import React from 'react';
import JobsContext from '../JobsContext';
import { format } from 'date-fns';

export default class NewJobEvent extends React.Component {
  static contextType = JobsContext;

  verifyEventField = (cardId, eventObj) => {
    const { eventType } = eventObj;
    return !eventType
      ? this.setState({ eventObj: { newEventError: true } })
      : this.context.cardsFunctions.handleAddNewEvent(cardId, eventObj);
  };

  render() {
    const { handleEventChange, JobCardState, cardsFunctions } = this.context;
    const { cardId } = this.props;
    return (
      <div className='event'>
        <h4>New Event</h4>
        <form className='edit-form'>
          <p>Date: {format(new Date(), 'M/DD/YYYY')}</p>
          <label htmlFor='contactName'>Name:</label>
          <p>
            <input
              name='eventType'
              value={this.context.JobCardState.eventType}
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
                  this.verifyEventField(this.props.cardId, JobCardState.events)
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
