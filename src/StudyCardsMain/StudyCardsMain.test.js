import React from 'react';
import * as renderer from 'react-test-renderer';
import StudyCardsMain from './StudyCardsMain';

const renderWithProps = (props) => {
  const defaultProps = {
    match: { params: { userName: 'TestUser' } },
  };
  return renderer.create(<StudyCardsMain {...defaultProps} {...props} />);
};

it('renders without crashing', () => {
  renderWithProps({});
});
