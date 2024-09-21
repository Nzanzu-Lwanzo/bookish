import { useContext, createContext, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookishDb from "../database/api";

const ReadPageContext = createContext();

export const useReadPageContext = () => {
  return useContext(ReadPageContext);
};

export const ReadPageContextProvider = ({ children }) => {
  
  const data = {

  };

  return (
    <ReadPageContext.Provider value={data}>{children}</ReadPageContext.Provider>
  );
};
