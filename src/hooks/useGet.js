import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useFetcher } from "react-router-dom";
import BookishDb from "../database/api";

export function useGetCollectionBooks() {
  const { setBooks } = useAppContext();
  

  return {
    fetcher: async function (cid) {
      const database = await BookishDb.init();
      const fechedData = await database.getCollectionBooks(cid);
      setBooks(fechedData?.books || []);
    },
  };
}
