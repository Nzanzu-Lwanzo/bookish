import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useFetcher } from "react-router-dom";
import BookishDb from "../database/api";
import { enqueueSnackbar } from "notistack";

export function useGetCollectionBooks() {
  const { setBooks } = useAppContext();
  
  return {
    fetcher: async function (cid) {
      try {
        const database = await BookishDb.init();
      const fechedData = await database.getCollectionBooks(cid);
      setBooks(fechedData?.books || []);
      } catch(e) {
        enqueueSnackbar("Nous n'avons pas pu récupérer les livres")
      }
      
    },
  };
}
