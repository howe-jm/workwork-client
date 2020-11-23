import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import JobCard from './JobCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const card = {
    id: 1,
    companyName: 'Test Name',
    jobTitle: 'Test Title',
    jobUrl: 'https://www.google.com',
    addingContact: false,
    addingEvent: false,
  };
  ReactDOM.render(
    <BrowserRouter>
      <JobCard card={card} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
