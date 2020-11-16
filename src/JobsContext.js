import React from 'react';

export default React.createContext({
  cardFunctions: {
    changeContactState: () => {},
    submitContactState: () => {},
    handleContactChange: () => {},
    handleAddContactButton: () => {},
    changeCardComments: () => {},
    handleAddNewContact: () => {},
    handleDeleteContact: () => {},
  },
});
