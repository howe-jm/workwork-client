import React from 'react';
import JobsContext from '../JobsContext';
import { format } from 'date-fns';

export default class JobEvents extends React.Component {
  static contextType = JobsContext;

  render() {
    console.log(this.props.events);
    return this.context.JobCardState.eventsCollapsed ? (
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
                  <img
                    src={require('../images/delete.png')}
                    onClick={() =>
                      this.context.cardsFunctions.handleDeleteEvent(
                        event.cardId,
                        event.id
                      )
                    }
                    alt='Delete'
                  />
                </div>
              </form>
            </div>
          </div>
        )
      )
    );
  }
}
