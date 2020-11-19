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
      let currentCard = this.cardToChange(cardId);
      let dataState = this.state.cardsData;

      switch (caseCard) {
        case 'contacts': {
          dataState[currentCard].contacts.push(data);
          dataState[currentCard].contacts.sort((a, b) => a.dateAdded > b.dateAdded);
          dataState[currentCard].addingContact = false;
          this.setState({ cardsData: dataState });
          break;
        }
        case 'events': {
          data.dateAdded = `${new Date().toISOString()}`;
          dataState[currentCard].events.push(data);
          dataState[currentCard].addingEvent = false;
          this.setState({ cardsData: dataState });
          break;
        }
        default: {
          dataState.push(data);
          dataState.addingCard = false;
          this.setState({ cardsData: dataState });
        }
      }
    },

    wipeDataFromState: (cardId, subId, caseCard) => {
      let currentCard = this.cardToChange(cardId);
      let dataState = this.state.cardsData;

      switch (caseCard) {
        case 'contacts': {
          dataState[currentCard].contacts = dataState[
            this.cardToChange(cardId)
          ].contacts.filter((contact) => contact.id !== subId);
          this.setState({ cardsData: dataState });
          break;
        }
        case 'events': {
          dataState[currentCard].events = dataState[
            this.cardToChange(cardId)
          ].events.filter((event) => event.id !== subId);
          this.setState({ cardsData: dataState });
          break;
        }
        default: {
          dataState = this.state.cardsData.filter((card) => card.id !== cardId);
          this.setState({ cardsData: dataState });
          break;
        }
      }
    },

    handleAddCardButton: () => {
      this.setState({ addingCard: !this.state.addingCard });
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
          {cardsData.map((card) => {
            console.log(card);
            return (
              <div className='oneCard' key={card.id}>
                <JobCard card={card} />
              </div>
            );
          })}
          <div className='add-card'>
            <AddJobCard addingCard={addingCard} />
          </div>
        </section>
      </JobsContext.Provider>
    );
  }
}
