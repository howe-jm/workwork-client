import React from 'react';
import './JobCardsMain.css';
import JobCard from './JobCard/JobCard';
import wwContext from '../wwContext';
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

    Promise.all([fetch(`${config.API_ENDPOINT}/api/jobs/${username}`, requestOptions)])
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

  changeContactState = (card, id) => {
    let cardToChange = this.state.cardsData.findIndex((cards) => cards.id === card);
    let contToChange = this.state.cardsData[cardToChange].contacts.findIndex(
      (contact) => contact.id === id
    );
    let dataState = this.state.cardsData;
    dataState[cardToChange].contacts[contToChange].editing = !dataState[cardToChange]
      .contacts[contToChange].editing;
    this.setState({ cardsData: dataState });
  };
  submitContactState = (card, id) => {
    let cardToChange = this.state.cardsData.findIndex((cards) => cards.id === card);
    let contToChange = this.state.cardsData[cardToChange].contacts.findIndex(
      (contact) => contact.id === id
    );
    let dataState = this.state.cardsData;
    dataState[cardToChange].contacts[contToChange].editing = !dataState[cardToChange]
      .contacts[contToChange].editing;
    this.setState({ cardsData: dataState });
    // Todo: PATCH api call.
  };
  handleContactChange = (value, cardId, contId) => {
    let cardToChange = this.state.cardsData.findIndex((cards) => cards.id === cardId);
    let contToChange = this.state.cardsData[cardToChange].contacts.findIndex(
      (contact) => contact.id === contId
    );
    let dataState = this.state.cardsData;
    dataState[cardToChange].contacts[contToChange][value.name] = value.value;
    this.setState({ cardsData: dataState });
  };
  handleAddContactButton = (cardId) => {
    let cardToChange = this.state.cardsData.findIndex((cards) => cards.id === cardId);
    let dataState = this.state.cardsData;
    dataState[cardToChange].addingContact = true;
    this.setState({ cardsData: dataState });
  };

  changeCardComments = (id, value) => {
    let dataState = this.state.cardsData;
    let cardToChange = this.state.cardsData.findIndex((cards) => cards.id === id);
    dataState[cardToChange].comments = value;
    this.setState({ cardsData: dataState });
  };

  handleAddNewContact = (cardId, values) => {
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

    fetch(`${config.API_ENDPOINT}/jobs/${username}/contacts/${cardId}`, requestOptions)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((result) => {
        let cardToChange = this.state.cardsData.findIndex((cards) => cards.id === cardId);
        let dataState = this.state.cardsData;
        dataState[cardToChange].contacts.push(result);
        dataState[cardToChange].addingContact = false;
        this.setState({ cardsData: dataState });
      })
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  };

  handleDeleteContact = (cardId, contId) => {
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
        let cardToChange = this.state.cardsData.findIndex((cards) => cards.id === cardId);
        let dataState = this.state.cardsData;

        dataState[cardToChange].contacts = dataState[cardToChange].contacts.filter(
          (contact) => contact.id !== contId
        );

        this.setState({ cardsData: dataState });
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { cardsData } = this.state;
    return this.state.loading ? (
      <div>Loading content...</div>
    ) : this.state.error ? (
      <div>{this.state.errorMsg}</div>
    ) : (
      <section className='CardsDisplay'>
        {cardsData.map((card) => (
          <div className='oneCard' key={card.id}>
            <JobCard
              id={card.id}
              companyName={card.companyName}
              jobTitle={card.jobTitle}
              jobUrl={card.jobUrl}
              contacts={card.contacts}
              events={card.events}
              comments={card.comments}
              changeContactState={this.changeContactState}
              changeCardComments={this.changeCardComments}
              handleContactChange={this.handleContactChange}
              submitContactState={this.submitContactState}
              handleAddContactButton={this.handleAddContactButton}
              handleAddNewContact={this.handleAddNewContact}
              addingContact={card.addingContact}
              handleDeleteContact={this.handleDeleteContact}
            />
          </div>
        ))}
      </section>
    );
  }
}
