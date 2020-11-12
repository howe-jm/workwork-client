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
            <form className='contact-mod-form'>
              <div className='edit-icon'>
                <img src={require('../../images/pencil.png')} alt='Edit' />
              </div>
              <div className='edit-icon'>
                <img src={require('../../images/delete.png')} alt='Delete' />
              </div>
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
            <form className='event-mod-form'>
              <div className='edit-icon'>
                <img src={require('../../images/pencil.png')} alt='Edit' />
              </div>
              <div className='edit-icon'>
                <img src={require('../../images/delete.png')} alt='Delete' />
              </div>
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
        <div className='section-header'>
          <h2>
            Contacts
            <div className='edit-icon'>
              <img src={require('../../images/down-arrow.png')} alt='Edit' />
            </div>
          </h2>
        </div>
        <div className='card-contacts'>{this.contactsTiles()}</div>
        <div className='newContact'>
          <button>New Contact</button>
        </div>
        <div className='section-header'>
          <h2>
            Events
            <div className='edit-icon'>
              <img src={require('../../images/down-arrow.png')} alt='Edit' />
            </div>
          </h2>
        </div>
        <div className='card-events'>{this.eventsTiles()}</div>
        <div className='newEvent'>
          <button>New Event</button>
        </div>
        <div className='section-header'>
          <h2>
            Comments
            <div className='edit-icon'>
              <img src={require('../../images/down-arrow.png')} alt='Edit' />
            </div>
          </h2>
        </div>
        <div className='card-comments-container'>
          <form>
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
