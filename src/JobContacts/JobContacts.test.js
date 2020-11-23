import React from 'react';
import * as renderer from 'react-test-renderer';
import JobContacts from './JobContacts';

const renderWithProps = (props) => {
  const defaultProps = {
    contacts: [
      {
        id: 1,
        contactName: 'Test Name',
        contactTitle: 'Test Title',
        contactEmail: 'email@email.com',
        contactNumber: '123-456-7890',
        card_id: 1,
      },
    ],
  };
  return renderer.create(<JobContacts {...defaultProps} {...props} />);
};

it('renders without crashing', () => {
  renderWithProps({});
});
