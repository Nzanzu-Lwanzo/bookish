import { useState, useTransition, useEffect, useCallback } from "react";
import BookishDb from "../database/api";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import { ORIGIN } from "../utils/constants";
import { lsRead } from "../utils/localStorage-io";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const useSyncDatabase = () => {
  const [collections, setCollections] = useState([]);
  const [books, setBooks] = useState([]);
  const [pending, startTransition] = useTransition();
  const [database, setDatabase] = useState(undefined);
  const [isSyncing, setIsSyncing] = useState(false);
  const { mutate } = useNetworkRequest();
  const navigateTo = useNavigate();
  const {
    setCollections: setCollectionsToDisplay,
    setBooks: setBooksToDisplay,
    setCurrentCollection,
    currentCollection,
  } = useAppContext();

  useEffect(() => {
    BookishDb.init()
      .then(async (db) => {
        setDatabase(db);
      })
      .catch((e) => {
        if (e.message === "NO_AUTH_USER") {
          enqueueSnackbar("Connectez-vous à la DBB cloud.");
          navigateTo("/auth");

          return;
        }

        alert(e.message);
        enqueueSnackbar("Echec d'initialisation de la BDD locale");
      });

    return () => {};
  }, []);

  return {
    sync: async () => {
      const unSyncedCollections = await database?.getUnSyncedCollections();
      const unSyncedBooks = await database?.getUnSyncedBooks();

      // Send collections & books

      setIsSyncing(true);
      mutate(
        {
          url: `/api/collection/?last_collection_id=${lsRead(
            "last-collection-id",
            0
          )}`,
          data: { collections: unSyncedCollections },
        },
        {
          onSuccess: async (data, { variables }, context) => {
            // Save the collections to local database

            if (data?.length !== 0) {
              for (let collection of data) {
                const savedCollection = await database.saveSyncedCollections(
                  collection
                );

                startTransition(() => {
                  setCollectionsToDisplay((prev) => [savedCollection, ...prev]);
                  setCurrentCollection(data[0]);
                });
              }
            }

            await database.markAllCollectionsAsSynced();
            enqueueSnackbar("Collections synced, actualisez la page !");

            // ********************* SYNC BOOKS ******************************* //

            setIsSyncing(true);
            mutate(
              {
                url: `/api/book/?last_book_id=${lsRead("last-book-id", 0)}`,
                data: { books: unSyncedBooks },
              },
              {
                onSuccess: async (data, variables, context) => {
                  // Save the  books to local database
                  if (data?.length !== 0) {
                    for (let book of data) {
                      const savedBook = await database.saveSyncedBooks(book);
                    }

                    startTransition(() => {
                      setBooksToDisplay(
                        data.filter(
                          (book) => book.cid === currentCollection?.__id
                        )
                      );
                    });
                  }

                  await database.markAllBooksAsSynced();
                  enqueueSnackbar("Books synced, actualisez la page !");
                },
                onError: (error) => {
                  switch (error.response?.status) {
                    case 401:
                      navigateTo("/auth");
                      enqueueSnackbar("Connectez-vous à la BDD cloud.");
                      return;

                    case 400:
                      enqueueSnackbar("Books not synced : opération avortée.");
                      return;

                    case 406:
                      enqueueSnackbar("Aucun livre à synchroniser !");
                      return;

                    default:
                      return;
                  }
                },
                onSettled: () => setIsSyncing(false),
              }

              // ****************** END OF SYNC BOOKS ************************* //
            );
          },

          onError: (error) => {
            switch (error.response?.status) {
              case 401:
                navigateTo("/auth");
                enqueueSnackbar("Connectez-vous à la BDD cloud.");
                return;

              case 400:
                enqueueSnackbar("Collections not synced : opération avortée.");
                return;

              case 406:
                enqueueSnackbar("Aucune collection à synchroniser !");
                return;

              default:
                return;
            }
          },

          onSettled: () => setIsSyncing(false),
        }
      );
    },

    unSyncedCollections: collections,
    state_is_updating: pending,
    is_synchronizing: isSyncing,
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
