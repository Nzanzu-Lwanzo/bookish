import Axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ORIGIN } from "../utils/constants";
import { enqueueSnackbar } from "notistack";
import { useTransition } from "react";
import { useAppContext } from "../context/AppContext";

export const useGetAllBooks = () => {
  const { setCloudBooks } = useAppContext();
  const [updating_state, startTransition] = useTransition();

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["cloud-books"],
    queryFn: async () => {
      const response = await Axios.get(ORIGIN.concat("/api/book"), {
        withCredentials: true,
      });
      
      startTransition(() => setCloudBooks(response.data));

      return response.data;
    },
  });

  return {
    data,
    isPending,
    isSuccess,
    isError,
    error,
    updating_state,
  };
};

export const useDeleteBook = () => {
  const { setCloudBooks } = useAppContext();
  const [updating_state, startTransition] = useTransition();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["cloud-books"],
    mutationFn: async function (id) {
      try {
        const response = await Axios.delete(ORIGIN.concat(`/api/book/${id}`), {
          withCredentials: true,
        });

        startTransition(() =>
          setCloudBooks((books) => books.filter((book) => book._id !== id))
        );

        return response.data;
      } catch (e) {
        enqueueSnackbar("Erreur : livre cloud non supprimé !");
      }
    },
  });

  return { mutate, isPending, isSuccess, updating_state };
};
