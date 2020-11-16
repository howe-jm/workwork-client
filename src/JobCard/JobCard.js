import React from 'react';
import { format } from 'date-fns';
import JobsContext from '../JobsContext';
import Contacts from '../Contacts/Contacts';
import NewContact from '../NewContact/NewContact';

import './JobCard.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class JobCard extends React.Component {
  static contextType = JobsContext;

  state = {
    contacts: {
      contactName: '',
      contactTitle: '',
      contactNumber: '',
      contactEmail: '',
      newContactError: false,
      errorMsg: '',
    },
  };

  eventsTiles = () => {
    return this.props.card.events.length === 0 ? (
      <div className='no-events'>No events yet!</div>
    ) : (
      this.props.card.events.map((event) =>
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
                  <img src={require('../images/delete.png')} alt='Delete' />
                </div>
              </form>
            </div>
          </div>
        )
      )
    );
  };

  handleContactChange = (name, value) => {
    let contactsObj = this.state.contacts;
    contactsObj[name] = value;
    this.setState({ contacts: contactsObj });
  };

  eventSubmitForm = () => {
    return (
      <div>
        Event: <input value='' />
      </div>
    );
  };

  addContactButtonListner = (id) => {
    this.setState({
      contacts: {
        contactName: '',
        contactTitle: '',
        contactNumber: '',
        contactEmail: '',
        newContactError: false,
        errorMsg: '',
      },
    });
    return this.context.cardsFunctions.handleAddContactButton(id);
  };

  render() {
    const { id, companyName, jobTitle, jobUrl, addingContact } = this.props.card;
    const { cardsFunctions } = this.context;
    const value = {
      cardsFunctions: this.context.cardsFunctions,
      handleContactChange: this.handleContactChange,
      JobCardState: this.state,
    };
    return (
      <JobsContext.Provider value={value}>
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
                <img src={require('../images/down-arrow.png')} alt='Add new contact' />
              </div>
            </h2>
          </div>
          <div className='edit-icon'>
            <img
              src={require('../images/plus.png')}
              onClick={() => this.addContactButtonListner(id)}
              alt='Add new contact'
            />
          </div>
          <div className='card-contacts'>
            {addingContact ? (
              <NewContact cardId={this.props.card.id} />
            ) : (
              <Contacts contacts={this.props.card.contacts} />
            )}
          </div>
          <div className='section-header'>
            <h2>
              Events
              <div className='edit-icon'>
                <img src={require('../images/down-arrow.png')} alt='Edit' />
              </div>
            </h2>
          </div>
          <div className='edit-icon'>
            <img src={require('../images/plus.png')} alt='Add new contact' />
          </div>
          <div className='card-events'>{this.eventsTiles()}</div>
          <div className='section-header'>
            <h2>
              Comments
              <div className='edit-icon'>
                <img src={require('../images/down-arrow.png')} alt='Edit' />
              </div>
            </h2>
          </div>
          <div className='card-comments-container'>
            <form>
              <textarea
                value={this.props.card.comments}
                onChange={(event) =>
                  cardsFunctions.changeCardComments(id, event.target.value)
                }
              ></textarea>
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
      </JobsContext.Provider>
    );
  }
}
