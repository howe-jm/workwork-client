import React from 'react';
import './JobCard.css';
import { format } from 'date-fns';
import wwContext from '../../wwContext';

export default class JobCard extends React.Component {
  static contextType = wwContext;

  contactsTiles = () => {
    return this.props.contacts.length === 0 ? (
      <div className='no-contacts'>No contacts yet!</div>
    ) : (
      this.props.contacts.map((contact) => (
        <div className='contact' key={contact.id}>
          <h4>{contact.contactname}</h4>
          <p>{contact.contacttitle}</p>
          <p>{contact.contactnumber}</p>
          <p className='c-email'>{contact.contactemail}</p>
          <div className='cont-buttons'>
            <form>
              <button>Edit</button>
              <button>Delete</button>
            </form>
          </div>
        </div>
      ))
    );
  };

  eventsTiles = () => {
    return this.props.events.length === 0 ? (
      <div className='no-events'>No events yet!</div>
    ) : (
      this.props.events.map((event) => (
        <div className='event' key={event.id}>
          <p>
            {format(event.event_added, 'M/DD/YYYY')}: {event.eventtype}
          </p>
          <div className='event-buttons'>
            <form>
              <button>Edit</button>
              <button>Delete</button>
            </form>
          </div>
        </div>
      ))
    );
  };

  render() {
    const { companyName, jobTitle, jobUrl } = this.props;

    return (
      <div>
        <div className='cardTitle'>
          <h2>{companyName}</h2>
          <h3>{jobTitle}</h3>
          <p>{jobUrl}</p>
        </div>
        <h2>Contacts</h2>
        <div className='card-contacts'>{this.contactsTiles()}</div>
        <div className='newContact'>
          <button>New Contact</button>
        </div>
        <h2>Events</h2>
        <div className='card-events'>{this.eventsTiles()}</div>
        <div className='newEvent'>
          <button>New Event</button>
        </div>
        <h2>Comments</h2>
        <div className='card-comments-container'>
          <form className='card-comments-container'>
            <textarea></textarea>
            <p>
              <button>Save</button>
            </p>
          </form>
        </div>
        <div className='card-buttons'>
          <form>
            <button>Edit</button>
            <button>Delete</button>
          </form>
        </div>
      </div>
    );
  }
}
