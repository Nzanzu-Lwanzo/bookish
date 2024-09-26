import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useFetcher } from "react-router-dom";
import BookishDb from "../database/api";
import { enqueueSnackbar } from "notistack";

export function useGetCollectionBooks() {
  const { setBooks } = useAppContext();
  const [fetchingBooks, setFetchingBooks] = useState(false);
  
  return {
    fetcher: async function (cid) {
      try {
        setFetchingBooks(true);
        const database = await BookishDb.init();
        const fetchedData = await database.getCollectionBooks(cid);

        const booksArrayReversed = fetchedData?.books?.reverse();
        setBooks(booksArrayReversed || []);
        setFetchingBooks(false);
      } catch (e) {
        enqueueSnackbar("Nous n'avons pas pu récupérer les livres");
      }
    },

    fetchingBooks,
  };
}
