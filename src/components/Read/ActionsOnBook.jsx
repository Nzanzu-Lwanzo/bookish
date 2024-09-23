import { enqueueSnackbar } from "notistack";
import { Trash2, PencilLine, DownoladIcon } from "../../assets/svg";
import { useAppContext } from "../../context/AppContext";
import { lsWrite } from "../../utils/localStorage-io";
import { startTransition, useState } from "react";
import Loader from "../CrossApp/Loader";
import { useReadPageContext } from "../../context/ReadPageContext";
import { useNavigate } from "react-router-dom";

const ActionsOnBook = () => {
  const { database, setCurrentBook, setBooks, setModalCard } = useAppContext();
  const { beingReadBook, setBeingReadBook } = useReadPageContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigateTo = useNavigate();

  return (
    <div className="actions-on-book">
      <button
        type="button"
        className="no-state-button"
        onClick={() => {
          enqueueSnackbar("Convertir en PDF et télécharger");
          enqueueSnackbar("Fonctionnalité bientôt disponible");
        }}
      >
        <span>Télécharger</span>
        <span>
          <DownoladIcon />
        </span>
      </button>
      <button
        type="button"
        className="action-icon center no"
        onClick={async (event) => {
          setIsDeleting(true);
          await database
            .deleteBook(beingReadBook?.id)
            .then((deletedId) => {
              navigateTo("/");
              enqueueSnackbar(
                `${beingReadBook?.title || "Ce livre"} a été supprimé !`
              );
              setCurrentBook(undefined);
              setBeingReadBook(undefined);

              startTransition(() => {
                setBooks((prev) => {
                  return prev?.filter((book) => book.id !== deletedId);
                });
              });

              lsWrite(["bookish-current-book", undefined]);
            })
            .catch((e) => {
              enqueueSnackbar("Erreur ! Livre non supprimé !");
            })
            .finally(($) => {
              setIsDeleting(false);
            });
        }}
      >
        {isDeleting ? <Loader ringColor="#000" trackColor="red" /> : <Trash2 />}
      </button>
      <button
        type="button"
        className="action-icon center ok"
        onClick={() => {
          enqueueSnackbar("Mettre-à-jour ce livre");
          enqueueSnackbar("Fonctionnalité bientôt disponible");
          return
          // setModalCard({ type: "SHOW", element: "book", is_update: true });
        }}
      >
        <PencilLine />
      </button>
    </div>
  );
};

export default ActionsOnBook;
