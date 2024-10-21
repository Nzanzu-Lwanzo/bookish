import { useContext, createContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BookishDb from "../database/api";
import { enqueueSnackbar } from "notistack";
import Loader from "../components/CrossApp/Loader";
import { useTransition } from "react";
import { useAppContext } from "./AppContext";
import WholePageLoader from "../components/CrossApp/WholePageLoader";

const ReadPageContext = createContext();

export const useReadPageContext = () => {
  return useContext(ReadPageContext);
};

export const ReadPageContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [beingReadBook, setBeingReadBook] = useState(undefined);
  const [pending, startTransition] = useTransition();
  const navigateTo = useNavigate();
  const { setCurrentBook } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);

    BookishDb.init()
      .then(async (database) => {
        let bid = parseInt(id);

        if (Number.isNaN(bid)) {
          return enqueueSnackbar("Paramètre de recherche invalide !");
        }

        const book = await database.getBook(bid);

        if (book) {
          startTransition(() => {
            setBeingReadBook(book);
            setCurrentBook(book);
          });
        } else {
          navigateTo("/");
          enqueueSnackbar("404 : Ressource introuvable !");
        }
      })
      .catch((error) => {
        enqueueSnackbar("Erreur de lecture de la BDD !");
        console.log(error);
      });

    return () => setCurrentBook(false);
  }, [pathname]);

  const data = {
    beingReadBook,
    setBeingReadBook,
  };

  return (
    <ReadPageContext.Provider value={data}>
      {beingReadBook && !pending ? children : <WholePageLoader />}
    </ReadPageContext.Provider>
  );
};
