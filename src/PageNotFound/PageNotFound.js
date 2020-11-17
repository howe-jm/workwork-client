import React from 'react';
import ErrorPage from '../ErrorBoundary/ErrorBoundary';
import JobsContext from '../JobsContext';
import './PageNotFound.css';

export default class PageNotFound extends React.Component {
  static contextType = JobsContext;

  render() {
    return (
      <ErrorPage>
        <div className='not-found'>
          <h2>You won't find what you're looking for here...</h2>
          <p>Get outta here, stalker.</p>
        </div>
      </ErrorPage>
    );
  }
}
