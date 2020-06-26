import React, { useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext(null);

function Store({ children }) {
  const [user, setUser] = useState({
    name: '',
    picture: '',
    filter: 'recent',
  });
  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export default Store;
