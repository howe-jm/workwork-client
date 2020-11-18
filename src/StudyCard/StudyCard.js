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
  };

  handleEventChange = (name, value) => {
    let eventsObj = this.state.events;
    eventsObj[name] = value;
    this.setState({ events: eventsObj });
  };

  changeCardComments = (cardId, value) => {
    let dataState = this.state.studyCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    dataState[card].comments = value;
    this.setState({ studyCardsState: { cardsData: dataState } });
  };

  handleAddEventButton = (cardId) => {
    let dataState = this.state.studyCardsState.cardsData;
    let card = dataState.findIndex((card) => card.id === cardId);
    dataState[card].addingEvent = !dataState[card].addingEvent;
    this.setState({ studyCardsState: { cardsData: dataState } });
  };

  handleDeleteCard = (cardId) => {
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

  handleSubmitComments = (cardId) => {
    const username = this.context.userName;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      trainingName: this.props.card.trainingName,
      trainingUrl: this.props.card.trainingUrl,
      comments: this.props.card.comments,
    });

    console.log(raw);

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
      .then(() => this.submitCardState(cardId))
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
    const { id, trainingName, trainingUrl, addingEvent } = this.props.card;
    const value = {
      cardsFunctions: this.context.cardsFunctions,
      handleContactChange: this.handleContactChange,
      handleEventChange: this.handleEventChange,
      StudyCardState: this.state,
      userName: this.context.userName,
    };
    return (
      <StudyContext.Provider value={value}>
        <div>
          <div className='cardTitle'>
            <div className='card-delete-icon'>
              <img
                src={require('../images/cancel.png')}
                onClick={() => this.handleDeleteCard(id)}
                alt='Delete card'
              />
            </div>
            <h2>{trainingName}</h2>
            <p>{trainingUrl}</p>
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
                  <NewStudyEvent cardId={this.props.card.id} />
                ) : (
                  <StudyEvents events={this.props.card.events} />
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
      </StudyContext.Provider>
    );
  }
}
