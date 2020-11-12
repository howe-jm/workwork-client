import React from 'react';
import { format } from 'date-fns';
import wwContext from '../../wwContext';

import './JobCard.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class JobCard extends React.Component {
  static contextType = wwContext;

  state = {
    contacts: {
      contactName: '',
      contactTitle: '',
      contactNumber: '',
      contactEmail: '',
    },
  };

  contactsTiles = () => {
    return this.props.contacts.length === 0 ? (
      <div className='no-contacts'>No contacts yet!</div>
    ) : (
      this.props.contacts.map((contact) =>
        contact.editing ? (
          <div className='contact' key={contact.id}>
            <h4>Editing this contact</h4>
            <form className='edit-form'>
              <input
                name='contactName'
                value={contact.contactName}
                onChange={(e) =>
                  this.props.handleContactChange(e.target, contact.cardId, contact.id)
                }
              />
              <input
                name='contactTitle'
                value={contact.contactTitle}
                onChange={(e) =>
                  this.props.handleContactChange(e.target, contact.cardId, contact.id)
                }
              />
              <input
                name='contactNumber'
                value={contact.contactNumber}
                onChange={(e) =>
                  this.props.handleContactChange(e.target, contact.cardId, contact.id)
                }
              />
              <input
                name='contactEmail'
                className='edit-email'
                value={contact.contactEmail}
                onChange={(e) =>
                  this.props.handleContactChange(e.target, contact.cardId, contact.id)
                }
              />
              <div className='save-icon'>
                <img
                  src={require('../../images/save.png')}
                  onClick={() =>
                    this.props.submitContactState(contact.cardId, contact.id)
                  }
                  alt='Save changes'
                />
              </div>
            </form>
          </div>
        ) : (
          <div className='contact' key={contact.id}>
            <h4>{contact.contactName}</h4>
            <p>{contact.contactTitle}</p>
            <p>{contact.contactNumber}</p>
            <p className='c-email'>{contact.contactEmail}</p>
            <div className='cont-buttons'>
              <form className='contact-mod-form'>
                <div className='edit-icon'>
                  <img
                    src={require('../../images/pencil.png')}
                    onClick={() =>
                      this.props.changeContactState(contact.cardId, contact.id)
                    }
                    alt='Edit'
                  />
                </div>
                <div className='edit-icon'>
                  <img
                    src={require('../../images/delete.png')}
                    onClick={() =>
                      this.props.handleDeleteContact(contact.cardId, contact.id)
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
  };

  eventsTiles = () => {
    return this.props.events.length === 0 ? (
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
                  <img src={require('../../images/delete.png')} alt='Delete' />
                </div>
              </form>
            </div>
          </div>
        )
      )
    );
  };

  eventSubmitForm = () => {
    return (
      <div>
        Event: <input value='' />
      </div>
    );
  };

  handleContactChange = (name, value) => {
    let contactsObj = this.state.contacts;
    contactsObj[name] = value;
    this.setState({ contacts: contactsObj });
  };

  newContactForm = () => {
    return (
      <div className='new-contact'>
        <h4>New Contact</h4>
        <form className='edit-form'>
          <label htmlFor='contactName'>Name:</label>
          <input
            name='contactName'
            value={this.state.contacts.contactName}
            onChange={(event) =>
              this.handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactTitle'>Title:</label>
          <input
            name='contactTitle'
            value={this.state.contacts.contactTitle}
            onChange={(event) =>
              this.handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactName'>Phone:</label>
          <input
            name='contactNumber'
            value={this.state.contacts.contactNumber}
            onChange={(event) =>
              this.handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactName'>E-Mail:</label>
          <input
            name='contactEmail'
            className='edit-email'
            value={this.state.contacts.contactEmail}
            onChange={(event) =>
              this.handleContactChange(event.target.name, event.target.value)
            }
          />
          <div className='save-icon'>
            <img
              src={require('../../images/save.png')}
              onClick={(e) =>
                this.props.handleAddNewContact(this.props.id, this.state.contacts)
              }
              alt='Save changes'
            />
          </div>
        </form>
      </div>
    );
  };

  render() {
    const { id, companyName, jobTitle, jobUrl, addingContact } = this.props;

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
              <img src={require('../../images/down-arrow.png')} alt='Add new contact' />
            </div>
          </h2>
        </div>
        <div className='edit-icon'>
          <img
            src={require('../../images/plus.png')}
            onClick={() => this.props.handleAddContactButton(id)}
            alt='Add new contact'
          />
        </div>
        <div className='card-contacts'>
          {addingContact ? this.newContactForm() : this.contactsTiles()}
        </div>
        <div className='section-header'>
          <h2>
            Events
            <div className='edit-icon'>
              <img src={require('../../images/down-arrow.png')} alt='Edit' />
            </div>
          </h2>
        </div>
        <div className='edit-icon'>
          <img src={require('../../images/plus.png')} alt='Add new contact' />
        </div>
        <div className='card-events'>{this.eventsTiles()}</div>
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
            <textarea
              value={this.props.comments}
              onChange={(event) => this.props.changeCardComments(id, event.target.value)}
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
    );
  }
}
