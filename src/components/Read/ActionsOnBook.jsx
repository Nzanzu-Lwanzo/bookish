import { enqueueSnackbar } from "notistack";
import { Trash2, PencilLine, DownoladIcon } from "../../assets/svg";
import { useAppContext } from "../../context/AppContext";
import { lsWrite } from "../../utils/localStorage-io";
import { startTransition, useRef, useState } from "react";
import Loader from "../CrossApp/Loader";
import { useReadPageContext } from "../../context/ReadPageContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import useConfirmDeletion from "../../hooks/useConfirmDeletion";

const ActionsOnBook = () => {
  const {
    database,
    setCurrentBook,
    setBooks,
    setModalCard,
    currentCollection,
  } = useAppContext();
  const { beingReadBook, setBeingReadBook } = useReadPageContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigateTo = useNavigate();
  const { confirmDeletion } = useConfirmDeletion();

  return (
    <div className="actions-on-book">
      {beingReadBook?.resume && (
        <button
          type="button"
          className="no-state-button download-book-button"
          onClick={async () => {
            enqueueSnackbar("Convertir en PDF et télécharger");
            enqueueSnackbar("Fonctionnalité bientôt disponible");
          }}
        >
          <span>Télécharger</span>
          <span>
            <DownoladIcon />
          </span>
        </button>
      )}
      <button
        type="button"
        className="action-icon center no"
        onClick={async (event) => {
          let yes = confirmDeletion(
            `Etes-vous sûr(e) de vouloir supprimer le livre ${beingReadBook?.title} ?`
          );

          if (yes) {
            setIsDeleting(true);
            await database
              .deleteBook(beingReadBook?._id)
              .then((deletedId) => {
                navigateTo("/");
                enqueueSnackbar(
                  `${beingReadBook?.title || "Ce livre"} a été supprimé !`
                );
                setCurrentBook(undefined);
                setBeingReadBook(undefined);

                startTransition(() => {
                  setBooks((prev) => {
                    return prev?.filter((book) => book._id !== deletedId);
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
          }
        }}
      >
        {isDeleting ? <Loader ringColor="#000" trackColor="red" /> : <Trash2 />}
      </button>
      <Link
        type="button"
        className="action-icon center ok"
        to={`/update-book/${beingReadBook?._id}`}
        onClick={() => {
          setCurrentBook(beingReadBook);
          return;
        }}
      >
        <PencilLine />
      </Link>
      <button
        type="button"
        className="action-icon center ok"
        onClick={() => {
          setModalCard({ type: "SHOW", element: "search-book" });
        }}
      >
        <Search />
      </button>
    </div>
  );
};

export default ActionsOnBook;
