import React from 'react';
import JobsContext from '../JobsContext';

export default class ContactsTiles extends React.Component {
  static contextType = JobsContext;

  render() {
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
                  this.context.cardsFunctions.handleContactChange(
                    e.target,
                    contact.cardId,
                    contact.id
                  )
                }
              />
              <input
                name='contactTitle'
                value={contact.contactTitle}
                onChange={(e) =>
                  this.context.cardsFunctions.handleContactChange(
                    e.target,
                    contact.cardId,
                    contact.id
                  )
                }
              />
              <input
                name='contactNumber'
                value={contact.contactNumber}
                onChange={(e) =>
                  this.context.cardsFunctions.handleContactChange(
                    e.target,
                    contact.cardId,
                    contact.id
                  )
                }
              />
              <input
                name='contactEmail'
                className='edit-email'
                value={contact.contactEmail}
                onChange={(e) =>
                  this.context.cardsFunctions.handleContactChange(
                    e.target,
                    contact.cardId,
                    contact.id
                  )
                }
              />
              <div className='save-icon'>
                <img
                  src={require('../images/save.png')}
                  onClick={() =>
                    this.context.cardsFunctions.submitContactState(
                      contact.cardId,
                      contact.id
                    )
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
                    src={require('../images/pencil.png')}
                    onClick={() =>
                      this.context.cardsFunctions.changeContactEditState(
                        contact.cardId,
                        contact.id
                      )
                    }
                    alt='Edit'
                  />
                </div>
                <div className='edit-icon'>
                  <img
                    src={require('../images/delete.png')}
                    onClick={() =>
                      this.context.cardsFunctions.handleDeleteContact(
                        contact.cardId,
                        contact.id
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
