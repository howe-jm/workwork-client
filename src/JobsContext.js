import React from 'react';

export default React.createContext({
  cardFunctions: {
    changeContactEditState: () => {},
    submitContactState: () => {},
    handleContactChange: () => {},
    handleAddContactButton: () => {},
    changeCardComments: () => {},
    handleAddCardButton: () => {},
    handleSubmitNewCard: () => {},
    pushDataToState: () => {},
    wipeDataFromState: () => {},
  },
  userName: '',
  setUserName: () => {},
  handleContactChange: () => {},
  handleEventChange: () => {},
  JobCardState: {},
  JobCardsState: {},
});
