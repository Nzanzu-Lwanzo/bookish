import Axios from "axios";
import { useState } from "react";
import { ORIGIN } from "../utils/constants";
import { enqueueSnackbar } from "notistack";

const useCollections = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  return {
    request: (collections) => {

        setIsRequesting(true);

        Axios.post(ORIGIN.concat("/api/collection"), collections, {
          withCredentials: true,
        }).then(response=>{

            if(response.status >= 400) throw new Error("SYNC_ERROR");

            // Save these collections on the local Database


            // Request for books too and save them on local database


        }).catch(e=>{
            enqueueSnackbar("Echec de la synchronisation.")
        }).finally(()=>{

        })

    },

    isRequesting,
  };
};
