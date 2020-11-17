import React from 'react';

export default React.createContext({
  cardFunctions: {
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
