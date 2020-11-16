import React from 'react';
import JobsContext from '../JobsContext';

export default class NewContact extends React.Component {
  static contextType = JobsContext;

  render() {
    return (
      <div className='new-contact'>
        <h4>New Contact</h4>
        <form className='edit-form'>
          <label htmlFor='contactName'>Name:</label>
          <input
            name='contactName'
            value={this.state.contacts.contactName}
            onChange={(event) =>
              this.props.handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactTitle'>Title:</label>
          <input
            name='contactTitle'
            value={this.state.contacts.contactTitle}
            onChange={(event) =>
              this.props.handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactName'>Phone:</label>
          <input
            name='contactNumber'
            value={this.state.contacts.contactNumber}
            onChange={(event) =>
              this.props.handleContactChange(event.target.name, event.target.value)
            }
          />
          <label htmlFor='contactName'>E-Mail:</label>
          <input
            name='contactEmail'
            className='edit-email'
            value={this.state.contacts.contactEmail}
            onChange={(event) =>
              this.props.handleContactChange(event.target.name, event.target.value)
            }
          />
          <div className='save-icon'>
            <img
              src={require('../images/save.png')}
              onClick={(e) =>
                this.context.handleAddNewContact(this.props.id, this.props.contacts)
              }
              alt='Save changes'
            />
          </div>
        </form>
      </div>
    );
  }
}
