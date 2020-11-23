import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddStudyCard from './AddStudyCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddStudyCard />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
