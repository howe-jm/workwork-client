import React from 'react';
import JobsContext from '../JobsContext';
import config from '../config';

export default class ContactsTiles extends React.Component {
  state = {
    editContact: {
      contactId: null,
      contactName: '',
      contactTitle: '',
      contactNumber: '',
      contactEmail: '',
    },
    editing: false,
    error: false,
    errorMsg: '',
  };
  static contextType = JobsContext;

  handleDeleteContact = (card, contId) => {
    const username = this.context.userName;
    const caseCard = 'contacts';

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(
      `${config.API_ENDPOINT}/jobs/${username}/contacts/delete/${contId}`,
      requestOptions
    )
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res;
      })
      .then(() => this.context.cardsFunctions.wipeDataFromState(card, contId, caseCard))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  changeContactEditState = () => {
    this.setState({ editing: !this.state.editing });
  };

  render() {
    return this.context.JobCardState.contactsCollapsed ? (
      <div></div>
    ) : this.props.contacts.length === 0 ? (
      <div className='no-contacts'>No contacts yet!</div>
    ) : (
      this.props.contacts.map((contact) =>
        this.state.editing ? (
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
                    onClick={() => this.changeContactEditState()}
                    alt='Edit'
                  />
                </div>
                <div className='edit-icon'>
                  <img
                    src={require('../images/delete.png')}
                    onClick={() => this.handleDeleteContact(contact.cardId, contact.id)}
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
