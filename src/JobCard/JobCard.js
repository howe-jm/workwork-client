import React from 'react';
import JobsContext from '../JobsContext';
import JobContacts from '../JobContacts/JobContacts';
import NewJobContact from '../NewJobContact/NewJobContact';
import JobEvents from '../JobEvents/JobEvents';
import NewJobEvent from '../NewJobEvent/NewJobEvent';

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
    contactsCollapsed: false,
    eventsCollapsed: false,
    commentsCollasped: false,
  };

  handleContactChange = (name, value) => {
    let contactsObj = this.state.contacts;
    contactsObj[name] = value;
    this.setState({ contacts: contactsObj });
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

  handleCollapseContacts = () => {
    this.setState({ contactsCollapsed: !this.state.contactsCollapsed });
  };
  handleCollapseEvents = () => {
    this.setState({ eventsCollapsed: !this.state.eventsCollapsed });
  };
  handleCollapseComments = () => {
    this.setState({ commentsCollapsed: !this.state.commentsCollapsed });
  };

  render() {
    const {
      id,
      companyName,
      jobTitle,
      jobUrl,
      addingContact,
      addingEvent,
    } = this.props.card;
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
                <img
                  src={require('../images/down-arrow.png')}
                  onClick={() => this.handleCollapseContacts()}
                  alt='Add new contact'
                />
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
              <NewJobContact cardId={this.props.card.id} />
            ) : (
              <JobContacts contacts={this.props.card.contacts} />
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
          <div className='card-events'>
            {addingEvent ? (
              <NewJobEvent cardId={this.props.card.id} />
            ) : (
              <JobEvents events={this.props.card.events} />
            )}
          </div>
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
