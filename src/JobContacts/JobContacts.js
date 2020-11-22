import React from 'react';
import JobsContext from '../JobsContext';
import config from '../config';
import './JobContacts.css';

const expression = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const regex = new RegExp(expression);

export default class JobContacts extends React.Component {
  state = {
    editContact: {
      id: null,
      contactName: '',
      contactTitle: '',
      contactNumber: '',
      contactEmail: '',
    },
    JobCardState: this.context.JobCardState,
    editing: false,
    validationError: false,
    validationMsg: '',
    error: false,
    errorMsg: '',
  };
  static contextType = JobsContext;

  handleDeleteContact = (event, card, contId) => {
    event.preventDefault();
    const userName = this.context.userName;
    const caseCard = 'contacts';

    let requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(
      `${config.API_ENDPOINT}/jobs/${userName}/contacts/update/${contId}`,
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

  verifyContactFields = (event, contact) => {
    event.preventDefault();
    const { contactName, contactTitle, contactEmail, contactNumber } = contact;
    return !contactName || contactName === ''
      ? this.setState({ validationError: true, validationMsg: 'Contact Name required!' })
      : !contactTitle || contactTitle === ''
      ? this.setState({ validationError: true, validationMsg: 'Contact Title required!' })
      : (!contactNumber || contactNumber === '') && (!contactEmail || contactEmail === '')
      ? this.setState({
          validationError: true,
          validationMsg: 'Phone number and/or e-mail required!',
        })
      : contactEmail && !contactEmail.match(regex)
      ? this.setState({ validationError: true, validationMsg: 'Invalid e-mail address!' })
      : this.handlePatchContact(event, contact);
  };

  handlePatchContact = (event, contact) => {
    const userName = this.context.userName;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify(contact);

    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${config.API_ENDPOINT}/jobs/${userName}/contacts/update/${contact.id}`,
      requestOptions
    )
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((result) => this.submitContactState(result.cardId, result.id))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  submitContactState = (cardId, contactId) => {
    let dataState = this.state.JobCardState.jobCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    let contact = dataState[card].contacts.findIndex(
      (contact) => contact.id === contactId
    );
    dataState[card].contacts[contact].editing = !dataState[card].contacts[contact]
      .editing;
    this.setState({ jobCardsState: { cardsData: dataState } });
  };

  handleContactChange = (event, cardId, contactId) => {
    this.setState({ validationError: false });
    let dataState = this.state.JobCardState.jobCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    let contact = dataState[card].contacts.findIndex(
      (contact) => contact.id === contactId
    );
    dataState[card].contacts[contact][event.name] = event.value;
    this.setState({ jobCardsState: { cardsData: dataState } });
  };

  changeContactEditState = (event, cardId, contactId) => {
    event.preventDefault();
    let dataState = this.state.JobCardState.jobCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    let contact = dataState[card].contacts.findIndex(
      (contact) => contact.id === contactId
    );
    dataState[card].contacts[contact].editing = !dataState[card].contacts[contact]
      .editing;
    this.setState({ jobCardsState: { cardsData: dataState } });
  };

  render() {
    return this.context.JobCardState.contactsCollapsed ? (
      <div></div>
    ) : this.props.contacts.length === 0 ? (
      <div className='no-contacts'>No contacts yet!</div>
    ) : (
      this.props.contacts.map((contact) =>
        contact.editing ? (
          <div className='contact' key={contact.id}>
            {this.state.validationError && (
              <div className='contact-card-error-text'>
                <h4>{this.state.validationMsg}</h4>
              </div>
            )}
            {!this.state.validationError && <h4>Editing this contact</h4>}
            <form className='edit-form'>
              <input
                name='contactName'
                value={contact.contactName}
                onChange={(e) =>
                  this.handleContactChange(e.target, contact.cardId, contact.id)
                }
              />
              <input
                name='contactTitle'
                value={contact.contactTitle}
                onChange={(e) =>
                  this.handleContactChange(e.target, contact.cardId, contact.id)
                }
              />
              <input
                name='contactNumber'
                value={contact.contactNumber}
                placeholder='Phone Number'
                onChange={(e) =>
                  this.handleContactChange(e.target, contact.cardId, contact.id)
                }
              />
              <input
                name='contactEmail'
                placeholder='E-Mail Address'
                className='edit-email'
                value={contact.contactEmail}
                onChange={(e) =>
                  this.handleContactChange(e.target, contact.cardId, contact.id)
                }
              />
              <div className='save-icon'>
                <button
                  className='card-button'
                  onClick={(event) => this.verifyContactFields(event, contact)}
                >
                  <img src={require('../images/save.png')} alt='Save changes' />
                </button>
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
                  <button
                    className='card-button'
                    onClick={(event) =>
                      this.changeContactEditState(event, contact.cardId, contact.id)
                    }
                  >
                    <img src={require('../images/pencil.png')} alt='Edit' />
                  </button>
                </div>
                <div className='edit-icon'>
                  <button
                    className='card-button'
                    onClick={(event) =>
                      this.handleDeleteContact(event, contact.cardId, contact.id)
                    }
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
