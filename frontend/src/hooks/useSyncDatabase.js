import { useState, useTransition, useEffect, useCallback } from "react";
import BookishDb from "../database/api";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import { ORIGIN } from "../utils/constants";
import { lsRead } from "../utils/localStorage-io";
import { useNavigate } from "react-router-dom";

const useSyncDatabase = () => {
  const [collections, setCollections] = useState([]);
  const [books, setBooks] = useState([]);
  const [pending, setTransition] = useTransition();
  const [database, setDatabase] = useState(undefined);
  const { mutate } = useNetworkRequest();
  const navigateTo = useNavigate();

  useEffect(() => {
    BookishDb.init()
      .then(async (db) => {
        return db;
      })
      .then((db) => setDatabase(db))
      .catch((e) => {
        if (e.message === "NO_AUTH_USER") {
          enqueueSnackbar("Connectez-vous à votre Base de Données cloud.");
          navigateTo("/auth");

          return;
        }

        enqueueSnackbar("Echec d'initialisation de la BDD locale");
      });

    return () => {};
  }, []);

  return {
    sync: async () => {
      // Send collections & books

      const unSyncedCollections = await database?.getUnSyncedCollections();
      const unSyncedBooks = await database?.getUnSyncedBooks();

      setTransition(() => {
        setCollections(unSyncedCollections);
        setBooks(unSyncedBooks);
      });

      mutate(
        {
          url: `/api/collection/?last_collection_id=${lsRead(
            "last-collection-id",
            0
          )}`,
          data: { collections },
        },
        {
          onSuccess: async (data, variables, context) => {
            // Save the collections to local database

            for (let collection of data) {
              await database.createCollection(collection);
            }

            await database.markAllCollectionsAsSynced();

            enqueueSnackbar("Collections synchronisées !");

            mutate(
              {
                url: `/api/book/?last_book_id=${lsRead("last-book-id", 0)}`,
                data: { books },
              },
              {
                onSuccess: async (data, variables, context) => {
                  // Save the  books to local database
                  for (let book of data) {
                    await database.createBook(book);
                  }

                  await database.markAllBooksAsSynced();
                  enqueueSnackbar("Livres synchronisés !");
                },
                onError: (error) => {
                  console.log(error);
                  enqueueSnackbar(
                    "Livres non synchronisés : opération avortée."
                  );
                },
              }
            );
          },

          onError: (error) => {
            console.log(error);
            enqueueSnackbar(
              "Collections non synchronisées : opération avortée."
            );
          },
        }
      );
    },

    unSyncedCollections: collections,
    state_is_updating: pending,
  };
};

function useNetworkRequest() {
  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationKey: ["collection"],
    mutationFn: async ({ url, data }) => {
      const response = await Axios.post(ORIGIN.concat(url), data, {
        withCredentials: true,
      });

      return response.data;
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    data,
  };
}

export default useSyncDatabase;
