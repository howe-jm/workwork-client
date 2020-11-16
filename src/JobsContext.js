import React from 'react';

export default React.createContext({
  cardFunctions: {
    changeContactEditState: () => {},
    submitContactState: () => {},
    handleContactChange: () => {},
    handleAddContactButton: () => {},
    changeCardComments: () => {},
    handleAddNewContact: () => {},
    handleDeleteContact: () => {},
  },
});
