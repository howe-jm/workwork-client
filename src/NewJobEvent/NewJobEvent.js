import React from 'react';
import JobsContext from '../JobsContext';

export default class NewJobEvent extends React.Component {
  static contextType = JobsContext;

  render() {
    return <div className='new-event'>Adding New Event</div>;
  }
}
