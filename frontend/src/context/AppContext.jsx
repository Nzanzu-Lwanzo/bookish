import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { modalReducer } from "../utils/reducers";
import BookishDb from "../database/api";
import { lsRead } from "../utils/localStorage-io";
import { enqueueSnackbar } from "notistack";
import getStorageInfo from "../utils/storage";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = function ({ children }) {
  const [collectionsAppearance, setCollectionsAppearance] = useState(false);
  const [database, setDatabase] = useState(null);
  const [collections, setCollections] = useState([]);
  const [currentCollection, setCurrentCollection] = useState(undefined);
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(undefined);
  const [isFetching, setIsFetching] = useState(true);
  const [modalCard, setModalCard] = useReducer(modalReducer, {
    show: false,
    element: "book",
    is_update: false,
  });
  const [auth, setAuth] = useState(lsRead("bookish-auth", undefined));

  const [storage, setStorage] = useState({
    totalStorage: 0,
    totalUsage: 0,
  });

  useEffect(() => {
    getStorageInfo()
      .then(({ totalStorage, totalUsage }) => {
        setStorage({ totalStorage, totalUsage });
      })
      .catch((e) => null);
  }, []);

  useEffect(() => {
    BookishDb.init()
      .then((db) => {
        setDatabase(db);
        return db;
      })
      .then(async (db) => {
        const fetchedCollections = await db?.getCollections();

        if (fetchedCollections) {
          setCollections(fetchedCollections || []);
          setCurrentCollection(fetchedCollections?.at(-1));
          return { db, chosenCollection: fetchedCollections.at(-1) };
        }

        return { db, chosenCollection: undefined };
      })
      .then(async ({ db, chosenCollection }) => {
        const fetchedBooks = await db.getCollectionBooks(
          chosenCollection?.__id || 0
        );

        const booksArrayReversed = fetchedBooks?.books?.reverse();

        setBooks(booksArrayReversed);
      })
      .catch((error) => {
        enqueueSnackbar("Erreur de création de la DBB");
      })
      .finally(($) => setIsFetching(false));
  }, []);

  const data = {
    collectionsAppearance,
    setCollectionsAppearance,
    modalCard,
    setModalCard,
    database,
    collections,
    setCollections,
    currentCollection,
    setCurrentCollection,
    books,
    setBooks,
    currentBook,
    setCurrentBook,
    isFetching,
    auth,
    setAuth,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
