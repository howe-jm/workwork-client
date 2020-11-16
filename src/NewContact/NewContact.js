import React from 'react';
import JobsContext from '../JobsContext';
import './NewContact.css';

export default class NewContact extends React.Component {
  static contextType = JobsContext;

  verifyContactFields = (cardId, contactObj) => {
    const { contactName, contactTitle, contactNumber, contactEmail } = contactObj;
    return !contactName || !contactTitle || (!contactNumber && !contactEmail)
      ? this.setState({ contactObj: { newContactError: true } })
      : this.context.cardsFunctions.handleAddNewContact(cardId);
  };

  render() {
    const { handleContactChange, JobCardState, cardsFunctions } = this.context;
    const { cardId } = this.props;
    return (
      <div className='new-contact'>
        <h4>New Contact</h4>
        <form className='edit-form'>
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
              <img
                src={require('../images/cancel.png')}
                onClick={() => cardsFunctions.handleAddContactButton(cardId)}
                alt='Cancel'
              />
            </div>
            <div className='save-icon'>
              <img
                src={require('../images/save.png')}
                onClick={(e) =>
                  this.verifyContactFields(this.props.cardId, JobCardState.contacts)
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
