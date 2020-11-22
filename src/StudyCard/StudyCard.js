import React from 'react';
import StudyContext from '../StudyContext';
import StudyEvents from '../StudyEvents/StudyEvents';
import NewStudyEvent from '../NewStudyEvent/NewStudyEvent';
import config from '../config';

import './StudyCard.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class StudyCard extends React.Component {
  static contextType = StudyContext;

  state = {
    events: {
      eventType: '',
      dateAdded: '',
      newEventError: false,
    },
    comments: '',
    studyCardsState: this.context.studyCardsState,
    cardCollapsed: true,
    eventsCollapsed: false,
    commentsCollasped: true,
    commentSaved: true,
  };

  handleEventChange = (name, value) => {
    let eventsObj = this.state.events;
    eventsObj[name] = value;
    this.setState({ events: eventsObj });
  };

  changeCardComments = (cardId, value) => {
    this.setState({ commentSaved: false });
    let dataState = this.state.studyCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    dataState[card].comments = value;
    this.setState({ cardsData: dataState });
  };

  handleAddEventButton = (cardId) => {
    let dataState = this.state.studyCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    dataState[card].addingEvent = !dataState[card].addingEvent;
    this.setState({ studyCardsState: { cardsData: dataState } });
  };

  handleDeleteCard = (event, cardId) => {
    event.preventDefault();
    const username = this.context.userName;
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`${config.API_ENDPOINT}/study/${username}/cards/${cardId}`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res;
      })
      .then(() => this.context.cardsFunctions.wipeDataFromState(cardId))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  handleSubmitComments = (event, cardId) => {
    event.preventDefault();
    this.setState({ commentSaved: true });

    const username = this.context.userName;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      trainingName: this.props.card.trainingName,
      trainingUrl: this.props.card.trainingUrl,
      comments: this.props.card.comments,
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${config.API_ENDPOINT}/study/${username}/cards/${cardId}`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res;
      })
      .then(() => this.submitCardState(cardId, this.props.card))
      .then(() => this.setState({ studyCardsState: this.context.studyCardsState }))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  submitCardState = (cardId, cardData) => {
    let dataState = this.state.studyCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    dataState[card] = cardData;
    this.setState({ studyCardsState: { cardsData: dataState } });
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

  addEventButtonListner = (event, id) => {
    event.preventDefault();
    this.clearState();
    return this.handleAddEventButton(id);
  };

  handleCollapseContacts = (event) => {
    event.preventDefault();
    this.setState({ contactsCollapsed: !this.state.contactsCollapsed });
  };
  handleCollapseEvents = (event) => {
    event.preventDefault();
    this.setState({ eventsCollapsed: !this.state.eventsCollapsed });
  };
  handleCollapseComments = (event) => {
    event.preventDefault();
    this.setState({ commentsCollapsed: !this.state.commentsCollapsed });
  };
  handleCollapseCard = (event) => {
    event.preventDefault();
    this.setState({ cardCollapsed: !this.state.cardCollapsed });
  };

  render() {
    const { id, trainingName, trainingUrl, addingEvent } = this.props.card;
    const value = {
      cardsFunctions: this.context.cardsFunctions,
      handleContactChange: this.handleContactChange,
      handleEventChange: this.handleEventChange,
      addEventButtonListner: this.addEventButtonListner,
      StudyCardState: this.state,
      userName: this.context.userName,
    };
    return (
      <StudyContext.Provider value={value}>
        <div className='card-container'>
          <div className='card-title'>
            <div className='card-delete-icon'>
              <button
                className='card-button'
                onClick={(event) => this.handleDeleteCard(event, id)}
              >
                <img src={require('../images/cancel.png')} alt='Delete card' />
              </button>
            </div>

            <h2>{trainingName}</h2>
            <p>{trainingUrl}</p>
            <div className='edit-icon'>
              <button
                className='card-button'
                onClick={(event) => this.handleCollapseCard(event)}
              >
                <img src={require('../images/down-arrow.png')} alt='Collapse Contacts' />
              </button>
            </div>
          </div>
          {this.state.cardCollapsed ? null : (
            <div>
              <div className='section-header'>
                <h2>
                  Events
                  <div className='edit-icon'>
                    <button
                      className='card-button'
                      onClick={(event) => this.handleCollapseEvents(event)}
                    >
                      <img
                        src={require('../images/down-arrow.png')}
                        alt='Collapse Events'
                      />
                    </button>
                  </div>
                </h2>
              </div>
              <div className='edit-icon'>
                <button
                  className='card-button'
                  onClick={(event) => this.addEventButtonListner(event, id)}
                >
                  <img src={require('../images/plus.png')} alt='Add new contact' />
                </button>
              </div>
              <div className='card-events'>
                {addingEvent ? (
                  <NewStudyEvent cardId={this.props.card.id} />
                ) : (
                  <StudyEvents events={this.props.card.events} />
                )}
              </div>
              <div className='section-header'>
                <h2>
                  Comments
                  <div className='edit-icon'>
                    <button
                      className='card-button'
                      onClick={(event) => this.handleCollapseComments(event)}
                    >
                      <img
                        src={require('../images/down-arrow.png')}
                        alt='Collapse Comments'
                      />
                    </button>
                  </div>
                </h2>
              </div>
              <div className='card-comments-container'>
                {this.state.commentsCollapsed ? (
                  <div></div>
                ) : (
                  <form
                    onSubmit={(event) =>
                      this.handleSubmitComments(event, this.props.card.id)
                    }
                  >
                    <textarea
                      value={this.props.card.comments}
                      onChange={(event) =>
                        this.changeCardComments(this.props.card.id, event.target.value)
                      }
                    ></textarea>
                    {this.state.commentSaved && (
                      <div className='saved'>Comments Saved!</div>
                    )}
                    {!this.state.commentSaved && (
                      <div className='saved'>Unsaved Comments!</div>
                    )}
                    <div className='save-comments'>
                      <button type='submit' className='card-button'>
                        <img src={require('../images/save.png')} alt='Save changes' />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </StudyContext.Provider>
    );
  }
}
