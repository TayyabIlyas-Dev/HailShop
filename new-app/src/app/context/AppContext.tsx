import { createContext, useState, ReactNode } from 'react';

interface AppContextType {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <AppContext.Provider value={{ showCart, setShowCart }}>
      {children}
    </AppContext.Provider>
  );
};
