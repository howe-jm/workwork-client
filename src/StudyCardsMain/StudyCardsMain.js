import React from 'react';
import './StudyCardsMain.css';
// import StudyCards from './StudyCards/StudyCards';

export default class StudyCardMain extends React.Component {
  state = {
    userLoggedIn: this.props.match.params.userName,
    cardsDisplayed: 'jobs',
    cardsData: [],
    loading: false,
    error: false,
    errorMsg: '',
  };

  render() {
    return <section className='CardsDisplay'>Nothing here yet...</section>;
  }
}
