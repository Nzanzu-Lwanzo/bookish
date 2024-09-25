import { useState, useTransition, useEffect } from "react";
import BookishDb from "../database/api";
import { enqueueSnackbar } from "notistack";

const useSyncDatabase = () => {
  const [collections, setCollections] = useState([]);
  const [pending, setTransition] = useTransition();
  const [database,setDatabase] = useState(undefined);

  useEffect(() => {

    BookishDb.init()
      .then(async (db) => {
        const collections = await db?.getUnSyncedCollections();
        setTransition(() => setCollections(collections));
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



    },

    unSyncedCollections: collections,
    state_is_updating: pending,
  };
};

export default useSyncDatabase;
