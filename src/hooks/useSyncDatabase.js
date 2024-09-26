import { useState, useTransition, useEffect } from "react";
import BookishDb from "../database/api";
import { enqueueSnackbar } from "notistack";

const useSyncDatabase = () => {
  const [collections, setCollections] = useState([]);
  const [books,setBooks] = useState([]);
  const [pending, setTransition] = useTransition();
  const [database,setDatabase] = useState(undefined);

  useEffect(() => {

    BookishDb.init()
      .then(async (db) => {
        const collections = await db?.getUnSyncedCollections();
        const books = await db?.getUnSyncedBooks();
        setTransition(() => {
          setCollections(collections);
          setBooks(books);
        });
        return db;
      })
      .then((db)=>setDatabase(db))
      .catch((e) => {
        enqueueSnackbar("Echec d'initialisation de la BDD locale");
      });

    return () => {
        
    };
  }, []);

  return {
    sync: async () => {

      // REQUEST THE CLOUD DATABASE TO STORE DATA INSIDE OF IT


    

      
      // WHEN I'M DONE SENDING THE COLLECTIONS ON THE CLOUD
      await database.markAllCollectionsAsSynced();
      await database.markAllBooksAsSynced();

    },

    unSyncedCollections: collections,
    state_is_updating: pending,
  };
};

export default useSyncDatabase;
