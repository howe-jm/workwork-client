import React from 'react';
import './JobCardsMain.css';
import JobCard from '../JobCard/JobCard';
import AddJobCard from '../AddJobCard/AddJobCard';
import JobsContext from '../JobsContext';
import config from '../config';

export default class JobCardsMain extends React.Component {
  state = {
    userName: this.props.match.params.userName,
    cardsData: [],
    loading: false,
    error: false,
    errorMsg: '',
    addingCard: false,
  };

  static contextType = JobsContext;

  componentDidMount() {
    this.context.setUserName(this.state.userName);
    this.setState({ loading: true });
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const username = this.state.userName;

    Promise.all([fetch(`${config.API_ENDPOINT}/jobs/${username}`, requestOptions)])
      .then(([cards]) => {
        if (!cards.ok) return cards.json().then((e) => Promise.reject(e));
        return Promise.all([cards.json()]);
      })
      .then(([cardsData]) => {
        cardsData.map((card) => {
          card.contacts.map((contact) => (contact.editing = false));
          card.events.map((event) => (event.editing = false));
          card.addingContact = false;
          card.addingEvent = false;
          card.editHeader = false;
          return null;
        });
        this.setState({ cardsData });
      })
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  }

  cardToChange = (card) => {
    return this.state.cardsData.findIndex((cards) => cards.id === card);
  };

  contactToChange = (currentCard, contactId) => {
    return this.state.cardsData[currentCard].contacts.findIndex(
      (contact) => contact.id === contactId
    );
  };

  cardsFunctions = {
    pushDataToState: (data, cardId, caseCard) => {
      switch (caseCard) {
        case 'contacts': {
          let currentCard = this.cardToChange(cardId);
          let dataState = this.state.cardsData;
          dataState[currentCard].contacts.push(data);
          dataState[currentCard].addingContact = false;
          this.setState({ cardsData: dataState });
          break;
        }
        case 'events': {
          let currentCard = this.cardToChange(cardId);
          let dataState = this.state.cardsData;
          data.dateAdded = `${new Date().toISOString()}`;
          dataState[currentCard].events.push(data);
          dataState[currentCard].addingEvent = false;
          this.setState({ cardsData: dataState });
          break;
        }
        default: {
          let dataState = this.state.cardsData;
          dataState.push(data);
          dataState.addingCard = false;
          this.setState({ cardsData: dataState });
        }
      }
    },

    wipeDataFromState: (cardId, subId, caseCard) => {
      switch (caseCard) {
        case 'contacts': {
          let currentCard = this.cardToChange(cardId);
          let dataState = this.state.cardsData;
          dataState[currentCard].contacts = dataState[currentCard].contacts.filter(
            (contact) => contact.id !== subId
          );
          this.setState({ cardsData: dataState });
          break;
        }
        case 'events': {
          let currentCard = this.cardToChange(cardId);
          let dataState = this.state.cardsData;
          dataState[currentCard].events = dataState[currentCard].events.filter(
            (event) => event.id !== subId
          );
          this.setState({ cardsData: dataState });
          break;
        }
        default: {
          let dataState = this.state.cardsData.filter((card) => card.id !== cardId);
          this.setState({ cardsData: dataState });
          break;
        }
      }
    },

    changeContactEditState: (card, contactId) => {
      let currentCard = this.cardToChange(card);
      let currentContact = this.contactToChange(currentCard, contactId);
      let dataState = this.state.cardsData;
      dataState[currentCard].contacts[currentContact].editing = !dataState[currentCard]
        .contacts[currentContact].editing;
      this.setState({ cardsData: dataState });
    },

    submitContactState: (card, contactId) => {
      let currentCard = this.cardToChange(card);
      let currentContact = this.contactToChange(currentCard, contactId);
      let dataState = this.state.cardsData;
      dataState[currentCard].contacts[currentContact].editing = !dataState[currentCard]
        .contacts[currentContact].editing;
      this.setState({ cardsData: dataState });
      // Todo: PATCH api call. (Contacts)
    },

    submitCommentsState: (card) => {
      // Todo: PATCH api call. (Comments)
    },

    handleAddCardButton: (card) => {
      this.setState({ addingCard: !this.state.addingCard });
      console.log(this.state.addingCard);
    },

    handleContactChange: (value, card, contactId) => {
      let currentCard = this.cardToChange(card);
      let currentContact = this.contactToChange(currentCard, contactId);
      let dataState = this.state.cardsData;
      dataState[currentCard].contacts[currentContact][value.name] = value.value;
      this.setState({ cardsData: dataState });
    },

    handleAddContactButton: (card) => {
      let currentCard = this.cardToChange(card);
      let dataState = this.state.cardsData;
      dataState[currentCard].addingContact = !dataState[currentCard].addingContact;
      this.setState({ cardsData: dataState });
    },

    handleAddEventButton: (card) => {
      let currentCard = this.cardToChange(card);
      let dataState = this.state.cardsData;
      dataState[currentCard].addingEvent = !dataState[currentCard].addingEvent;
      this.setState({ cardsData: dataState });
    },

    changeCardComments: (card, value) => {
      let dataState = this.state.cardsData;
      let currentCard = this.cardToChange(card);
      dataState[currentCard].comments = value;
      this.setState({ cardsData: dataState });
    },

    handleDeleteEvent: (card, eventId) => {
      const username = this.state.userName;

      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
      };

      fetch(
        `${config.API_ENDPOINT}/jobs/${username}/events/delete/${eventId}`,
        requestOptions
      )
        .then((res) => {
          if (!res.ok) return res.json().then((e) => Promise.reject(e));
          return res;
        })
        .then(() => {
          let currentCard = this.cardToChange(card);
          let dataState = this.state.cardsData;

          dataState[currentCard].events = dataState[currentCard].events.filter(
            (event) => event.id !== eventId
          );

          this.setState({ cardsData: dataState });
        })
        .catch((error) => {
          console.error({ error });
        });
    },
  };

  render() {
    const { cardsData, addingCard } = this.state;
    const value = {
      cardsFunctions: this.cardsFunctions,
      jobCardsState: this.state,
      userName: this.state.userName,
    };
    return this.state.loading ? (
      <div>Loading content...</div>
    ) : this.state.error ? (
      <div>{this.state.errorMsg}</div>
    ) : (
      <JobsContext.Provider value={value}>
        <section className='CardsDisplay'>
          {cardsData.map((card) => (
            <div className='oneCard' key={card.id}>
              <JobCard card={card} />
            </div>
          ))}
          <div className='add-card'>
            <AddJobCard addingCard={addingCard} />
          </div>
        </section>
      </JobsContext.Provider>
    );
  }
}
