import React from 'react';
import './StudyCardsMain.css';
import StudyCard from '../StudyCard/StudyCard';
import AddStudyCard from '../AddStudyCard/AddStudyCard';
import StudyContext from '../StudyContext';
import config from '../config';

export default class StudyCardsMain extends React.Component {
  state = {
    userName: this.props.match.params.userName,
    cardsData: [],
    loading: false,
    error: false,
    errorMsg: '',
    addingCard: false,
  };

  static contextType = StudyContext;

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

    Promise.all([fetch(`${config.API_ENDPOINT}/study/${username}`, requestOptions)])
      .then(([cards]) => {
        if (!cards.ok) return cards.json().then((e) => Promise.reject(e));
        return Promise.all([cards.json()]);
      })
      .then(([cardsData]) => {
        cardsData.map((card) => {
          card.events.map((event) => (event.editing = false));
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
      studyCardsState: this.state,
      userName: this.state.userName,
    };
    return this.state.loading ? (
      <div>Loading content...</div>
    ) : this.state.error ? (
      <div>{this.state.errorMsg}</div>
    ) : (
      <StudyContext.Provider value={value}>
        <section className='CardsDisplay'>
          {cardsData.map((card) => (
            <div className='oneCard' key={card.id}>
              <StudyCard card={card} />
            </div>
          ))}
          <div className='add-card'>
            <AddStudyCard addingCard={addingCard} />
          </div>
        </section>
      </StudyContext.Provider>
    );
  }
}
