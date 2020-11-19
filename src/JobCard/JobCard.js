import React from 'react';
import JobsContext from '../JobsContext';
import JobContacts from '../JobContacts/JobContacts';
import NewJobContact from '../NewJobContact/NewJobContact';
import JobEvents from '../JobEvents/JobEvents';
import NewJobEvent from '../NewJobEvent/NewJobEvent';
import config from '../config';

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
      editing: false,
      newContactError: false,
      errorMsg: '',
    },
    events: {
      eventType: '',
      dateAdded: '',
      newEventError: false,
    },
    comments: '',
    jobCardsState: this.context.jobCardsState,
    cardCollapsed: true,
    contactsCollapsed: false,
    eventsCollapsed: false,
    commentsCollasped: true,
  };

  handleContactChange = (name, value) => {
    let contactsObj = this.state.contacts;
    contactsObj[name] = value;
    this.setState({ contacts: contactsObj });
  };

  handleEventChange = (name, value) => {
    let eventsObj = this.state.events;
    eventsObj[name] = value;
    this.setState({ events: eventsObj });
  };

  changeCardComments = (cardId, value) => {
    let dataState = this.state.jobCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    dataState[card].comments = value;
    this.setState({ jobCardsState: { cardsData: dataState } });
  };

  handleAddContactButton = (cardId) => {
    let dataState = this.state.jobCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    dataState[card].addingContact = !dataState[card].addingContact;
    this.setState({ jobCardsState: { cardsData: dataState } });
  };

  handleAddEventButton = (cardId) => {
    let dataState = this.state.jobCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    dataState[card].addingEvent = !dataState[card].addingEvent;
    this.setState({ jobCardsState: { cardsData: dataState } });
  };

  handleDeleteCard = (cardId) => {
    const username = this.context.userName;
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`${config.API_ENDPOINT}/jobs/${username}/cards/${cardId}`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res;
      })
      .then(() => this.context.cardsFunctions.wipeDataFromState(cardId))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  handleSubmitComments = (cardId) => {
    const username = this.context.userName;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      companyName: this.props.card.companyName,
      jobTitle: this.props.card.jobTitle,
      jobUrl: this.props.card.jobUrl,
      comments: this.props.card.comments,
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${config.API_ENDPOINT}/jobs/${username}/cards/${cardId}`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res;
      })
      .then(() => this.submitCardState(cardId))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  submitCardState = (cardId, cardData) => {
    let dataState = this.state.jobCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    dataState[card] = cardData;
    this.setState({ jobCardsState: { cardsData: dataState } });
  };

  clearState = () => {
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
  };

  addContactButtonListner = (id) => {
    this.clearState();
    return this.handleAddContactButton(id);
  };

  addEventButtonListner = (id) => {
    this.clearState();
    return this.handleAddEventButton(id);
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
  handleCollapseCard = () => {
    this.setState({ cardCollapsed: !this.state.cardCollapsed });
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
    const value = {
      cardsFunctions: this.context.cardsFunctions,
      handleContactChange: this.handleContactChange,
      handleEventChange: this.handleEventChange,
      addContactButtonListner: this.addContactButtonListner,
      JobCardState: this.state,
      userName: this.context.userName,
    };
    return (
      <JobsContext.Provider value={value}>
        <div className='card-container'>
          <div className='card-title'>
            <div className='card-delete-icon'>
              <img
                src={require('../images/cancel.png')}
                onClick={() => this.handleDeleteCard(id)}
                alt='Delete card'
              />
            </div>
            <h2>{companyName}</h2>
            <h3>{jobTitle}</h3>
            <p>{jobUrl}</p>
            <div className='edit-icon'>
              <img
                src={require('../images/down-arrow.png')}
                onClick={() => this.handleCollapseCard()}
                alt='Collapse Contacts'
              />
            </div>
          </div>
          {this.state.cardCollapsed ? null : (
            <div>
              <div className='section-header'>
                <h2>
                  Contacts
                  <div className='edit-icon'>
                    <img
                      src={require('../images/down-arrow.png')}
                      onClick={() => this.handleCollapseContacts()}
                      alt='Collapse Contacts'
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
                    <img
                      src={require('../images/down-arrow.png')}
                      onClick={() => this.handleCollapseEvents()}
                      alt='Collapse Events'
                    />
                  </div>
                </h2>
              </div>
              <div className='edit-icon'>
                <img
                  src={require('../images/plus.png')}
                  onClick={() => this.addEventButtonListner(id)}
                  alt='Add new contact'
                />
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
                    <img
                      src={require('../images/down-arrow.png')}
                      onClick={() => this.handleCollapseComments()}
                      alt='Collapse Comments'
                    />
                  </div>
                </h2>
              </div>
              <div className='card-comments-container'>
                {this.state.commentsCollapsed ? (
                  <div></div>
                ) : (
                  <form>
                    <textarea
                      value={this.props.card.comments}
                      onChange={(event) =>
                        this.changeCardComments(id, event.target.value)
                      }
                    ></textarea>
                    <div className='save-comments'>
                      <img
                        src={require('../images/save.png')}
                        onClick={() => this.handleSubmitComments(this.props.card.id)}
                        alt='Save changes'
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </JobsContext.Provider>
    );
  }
}
