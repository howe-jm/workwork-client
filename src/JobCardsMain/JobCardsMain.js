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

    var requestOptions = { method: 'GET', headers: myHeaders, redirect: 'follow' };
    const username = this.state.userName;

    Promise.all([fetch(`${config.API_ENDPOINT}/jobs/${username}`, requestOptions)])
      .then(([cards]) => {
        if (!cards.ok) return cards.json().then((e) => Promise.reject(e));
        return Promise.all([cards.json()]);
      })
      .then(([cardsData]) => {
        this.setState({ cardsData });
      })
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        this.setState({ error: true, errorMsg: `${error}` });
      });
  }

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
            />
          </div>
        ))}
      </section>
    );
  }
}
