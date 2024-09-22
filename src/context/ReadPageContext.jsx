import {
  useContext,
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import BookishDb from "../database/api";
import { useLocation } from "react-router-dom";

const ReadPageContext = createContext();

export const useReadPageContext = () => {
  return useContext(ReadPageContext);
};

export const ReadPageContextProvider = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const data = {};

  return (
    <ReadPageContext.Provider value={data}>{children}</ReadPageContext.Provider>
  );
};
