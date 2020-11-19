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
  addContactButtonListner: () => {},
  JobCardState: {},
  JobCardsState: {},
});
