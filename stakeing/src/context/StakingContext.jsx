// StakingContext.js
import React, { createContext, useState } from 'react';
import './StakingStatus.css';

const StakingContext = createContext();

export const StakingProvider = ({ children }) => {
  const [isReload, setIsReload] = useState(false);

  return (
    <StakingContext.Provider value={{ isReload, setIsReload }}>
      {children}
    </StakingContext.Provider>
  );
};

export default StakingContext;
