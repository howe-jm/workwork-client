import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NewJobEvent from './NewJobEvent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NewJobEvent />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
