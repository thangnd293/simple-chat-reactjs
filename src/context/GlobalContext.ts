import { createContext, useContext, useEffect } from 'react';

import { User } from '@/types/user';

type GlobalContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const GlobalContext = createContext<GlobalContextType>({
    user: null,
    setUser: () => {},
});

export default GlobalContext;
export const GlobalContextProvider = GlobalContext.Provider;
export const useGlobalContext = () => useContext(GlobalContext);
