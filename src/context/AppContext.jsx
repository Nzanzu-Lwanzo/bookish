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
  const [modalCard, setModalCard] = useReducer(modalReducer, {
    show: false,
    element: "book",
    is_update: false,
  });

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
          chosenCollection?.id || 0
        );

        setBooks(fetchedBooks?.books);
      })
      .catch((error) => {
        enqueueSnackbar("Erreur de création de la DBB");
      });
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
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
