import React from 'react';
import JobsContext from '../JobsContext';

export default class NewContact extends React.Component {
  static contextType = JobsContext;

  render() {
    const { cardsFunctions } = this.context;
    console.log(this.context);
    return (
      <div className='new-contact'>
        <h4>New Contact</h4>
        <form className='edit-form'>
          <label htmlFor='contactName'>Name:</label>
          <input
            name='contactName'
            value={this.context.JobCardState.contactName}
            onChange={(event) =>
              this.context.handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactTitle'>Title:</label>
          <input
            name='contactTitle'
            value={this.context.JobCardState.contactTitle}
            onChange={(event) =>
              this.context.handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactName'>Phone:</label>
          <input
            name='contactNumber'
            value={this.context.JobCardState.contactNumber}
            onChange={(event) =>
              this.context.handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactName'>E-Mail:</label>
          <input
            name='contactEmail'
            className='edit-email'
            value={this.context.JobCardState.contactEmail}
            onChange={(event) =>
              this.context.handleContactChange(event.target.name, event.target.value)
            }
          />
          <div className='save-icon'>
            <img
              src={require('../images/save.png')}
              onClick={(e) =>
                cardsFunctions.handleAddNewContact(
                  this.props.cardId,
                  this.context.JobCardState.contacts
                )
              }
              alt='Save changes'
            />
          </div>
        </form>
      </div>
    );
  }
}
