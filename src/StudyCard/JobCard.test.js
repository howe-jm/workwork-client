import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StudyCard from './StudyCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const card = {
    id: 1,
    trainingName: 'Test Name',
    trainingUrl: 'https://www.google.com',
    addingEvent: false,
  };
  ReactDOM.render(
    <BrowserRouter>
      <StudyCard card={card} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
