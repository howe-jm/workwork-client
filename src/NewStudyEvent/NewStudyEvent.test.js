import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NewStudyEvent from './NewStudyEvent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NewStudyEvent />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
