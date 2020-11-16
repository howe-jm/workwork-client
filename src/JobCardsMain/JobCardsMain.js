import React from 'react';
import './JobCardsMain.css';
import JobCard from '../JobCard/JobCard';
import wwContext from '../wwContext';
import JobsContext from '../JobsContext';
import config from '../config';

export default class JobCardsMain extends React.Component {
  state = {
    userName: this.props.match.params.userName,
    cardsData: [],
    loading: false,
    error: false,
    errorMsg: '',
  };

  static contextType = wwContext;

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
      // Todo: PATCH api call.
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
      dataState[currentCard].addingContact = true;
      this.setState({ cardsData: dataState });
    },

    changeCardComments: (card, value) => {
      let dataState = this.state.cardsData;
      let currentCard = this.cardToChange(card);
      dataState[currentCard].comments = value;
      this.setState({ cardsData: dataState });
    },

    handleAddNewContact: (card, values) => {
      const username = this.state.userName;
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify(values);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${config.API_ENDPOINT}/jobs/${username}/contacts/${card}`, requestOptions)
        .then((res) => {
          if (!res.ok) return res.json().then((e) => Promise.reject(e));
          return res.json();
        })
        .then((result) => {
          let currentCard = this.cardToChange(card);
          let dataState = this.state.cardsData;
          dataState[currentCard].contacts.push(result);
          dataState[currentCard].addingContact = false;
          this.setState({ cardsData: dataState });
        })
        .catch((error) => {
          this.setState({ error: true, errorMsg: `${error}` });
        });
    },

    handleDeleteContact: (card, contId) => {
      const username = this.state.userName;

      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
      };

      fetch(
        `${config.API_ENDPOINT}/jobs/${username}/contacts/delete/${contId}`,
        requestOptions
      )
        .then((res) => {
          if (!res.ok) return res.json().then((e) => Promise.reject(e));
          return res;
        })
        .then(() => {
          let currentCard = this.cardToChange(card);
          let dataState = this.state.cardsData;

          dataState[currentCard].contacts = dataState[currentCard].contacts.filter(
            (contact) => contact.id !== contId
          );

          this.setState({ cardsData: dataState });
        })
        .catch((error) => {
          console.error({ error });
        });
    },
  };

  render() {
    const { cardsData } = this.state;
    const value = {
      cardsFunctions: this.cardsFunctions,
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
        </section>
      </JobsContext.Provider>
    );
  }
}
