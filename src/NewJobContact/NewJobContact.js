import React from 'react';
import JobsContext from '../JobsContext';
import config from '../config';
import './NewJobContact.css';

export default class NewContact extends React.Component {
  state = {
    newContact: {
      contactName: '',
      contactTitle: '',
      contactNumber: '',
      contactEmail: '',
    },
    jobCardsState: this.context.JobCardsSate,
    error: false,
    errorMsg: '',
  };

  static contextType = JobsContext;

  handleAddNewContact = (cardId, values) => {
    const userName = this.context.userName;
    const caseCard = 'contacts';
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(values);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${config.API_ENDPOINT}/jobs/${userName}/contacts/${cardId}`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((result) => {
        return this.context.cardsFunctions.pushDataToState(result, cardId, caseCard);
      })
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  verifyContactFields = (event, cardId, contactObj) => {
    event.preventDefault();
    const { contactName, contactTitle, contactNumber, contactEmail } = contactObj;
    return !contactName || !contactTitle || (!contactNumber && !contactEmail)
      ? this.setState({ contactObj: { newContactError: true } })
      : this.handleAddNewContact(cardId, contactObj);
  };

  render() {
    const { addContactButtonListner, handleContactChange, JobCardState } = this.context;
    const { cardId } = this.props;
    return (
      <div className='new-contact'>
        <h4>New Contact</h4>
        <form
          className='edit-form'
          onSubmit={(event) =>
            this.verifyContactFields(event, this.props.cardId, JobCardState.contacts)
          }
        >
          <label htmlFor='contactName'>Name:</label>
          <input
            name='contactName'
            value={this.context.JobCardState.contactName}
            onChange={(event) =>
              handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactTitle'>Title:</label>
          <input
            name='contactTitle'
            value={this.context.JobCardState.contactTitle}
            onChange={(event) =>
              handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactName'>Phone:</label>
          <input
            name='contactNumber'
            value={this.context.JobCardState.contactNumber}
            onChange={(event) =>
              handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactName'>E-Mail:</label>
          <input
            name='contactEmail'
            className='edit-email'
            value={this.context.JobCardState.contactEmail}
            onChange={(event) =>
              handleContactChange(event.target.name, event.target.value)
            }
          />
          <div className='buttons-container'>
            <div className='save-icon'>
              <button
                className='card-button'
                onClick={(event) => addContactButtonListner(event, cardId)}
              >
                <img src={require('../images/cancel.png')} alt='Cancel' />
              </button>
            </div>
            <div className='save-icon'>
              <button className='card-button' type='submit'>
                <img src={require('../images/save.png')} alt='Save changes' />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
