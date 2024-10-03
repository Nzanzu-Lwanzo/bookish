import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { enqueueSnackbar } from "notistack";
import { ORIGIN } from "../utils/constants";
import { env } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { lsWrite } from "../utils/localStorage-io";

const useAuth = () => {
  const { setAuth } = useAppContext();
  const [isRequesting, setIsRequesting] = useState(false);
  const navigateTo = useNavigate();

  return {
    requestAuthentication: async (data) => {
      try {
        setIsRequesting(true);
        const response = await Axios.post(ORIGIN.concat("/api/auth"), data, {
          withCredentials: true,
        });

        if (response.status < 400) {
          setAuth(response.data);
          lsWrite(["bookish-auth",response.data]);
          navigateTo("/");
          enqueueSnackbar("Vous pouvez synchroniser la BDD !");

          return;
        }

        enqueueSnackbar("Erreur ! Compte non connecté !");
      } catch (e) {
        setAuth(undefined);
        enqueueSnackbar("Fetch error : request failed.");
      } finally {
        setIsRequesting(false);
      }
    },
    isRequesting,
  };
};

export default useAuth;
