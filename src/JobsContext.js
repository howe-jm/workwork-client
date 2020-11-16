import React from 'react';

export default React.createContext({
  cardFunctions: {
    changeContactEditState: () => {},
    submitContactState: () => {},
    handleContactChange: () => {},
    handleAddContactButton: () => {},
    handleAddNewContact: () => {},
    handleDeleteContact: () => {},
    handleAddNewEvent: () => {},
    handleDeleteEvent: () => {},
    changeCardComments: () => {},
  },
  handleContactChange: () => {},
  handleEventChange: () => {},
  JobCardState: {},
});
