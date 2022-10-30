import React, { useState, createContext } from 'react';

interface children {
  children?: any
}

export const SingleUserContext = createContext({});

const SingleUserProvider = (children: children) => {
  const [user, setUser] = useState<any>();

  return (
    <SingleUserContext.Provider value={{ user, setUser }}>
      { children?.children }
    </SingleUserContext.Provider>
  )
}

export default SingleUserProvider