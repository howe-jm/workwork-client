import React from 'react';
import * as renderer from 'react-test-renderer';
import JobEvents from './JobEvents';

const renderWithProps = (props) => {
  const defaultProps = {
    events: [
      {
        id: 1,
        eventType: 'Test Event',
        dateAdded: '2020-11-22T13:37:17.220Z',
        card_id: 1,
      },
    ],
  };
  return renderer.create(<JobEvents {...defaultProps} {...props} />);
};

it('renders without crashing', () => {
  renderWithProps({});
});
