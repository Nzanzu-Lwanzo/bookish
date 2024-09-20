import { createContext, useContext, useReducer, useState } from "react";
import { modalReducer } from "../utils/reducers";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = function ({ children }) {

    const [collectionsAppearance,setCollectionsAppearance] = useState(false);
    const [modalCard, setModalCard] = useReducer(modalReducer,{
      show : false,
      element : 'book'
    });

  const data = {
    collectionsAppearance,
    setCollectionsAppearance,
    modalCard,
    setModalCard,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
