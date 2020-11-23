import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddJobCard from './AddJobCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddJobCard />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
