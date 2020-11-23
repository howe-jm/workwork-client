import React from 'react';
import * as renderer from 'react-test-renderer';
import JobCardsMain from './JobCardsMain';

const renderWithProps = (props) => {
  const defaultProps = {
    match: { params: { userName: 'TestUser' } },
  };
  return renderer.create(<JobCardsMain {...defaultProps} {...props} />);
};

it('renders without crashing', () => {
  renderWithProps({});
});
