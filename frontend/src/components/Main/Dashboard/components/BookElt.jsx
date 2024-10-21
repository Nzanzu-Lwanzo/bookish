import { Link } from "react-router-dom";
import { convertToDate } from "../../../../utils/convertTime";
import { useAppContext } from "../../../../context/AppContext";
import { lsWrite } from "../../../../utils/localStorage-io";
import Loader from "../../../CrossApp/Loader";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useDeleteBook } from "../../../../hooks/useCloud";

const BookElt = ({ book, isCloud = false }) => {
  const { setCurrentBook, currentCollection, auth } = useAppContext();
  const [pending, setBookToRead] = useTransition();
  const { updating_state, isPending, isSuccess, mutate: del } = useDeleteBook();

  return (
    <div className="book-elt-container">
      <Link
        to={isCloud ? `/cloud/${book._id}` : `/read-book/${book.__id}`}
        className="book-elt"
        onClick={() => {
          lsWrite(["bookish-current-book", book]);
          lsWrite([
            "bookish-main-page-scroll-coordinates",
            { x: window.scrollX, y: window.scrollY },
          ]);
        }}
        preventScrollReset={false}
      >
        {pending ? (
          <Loader></Loader>
        ) : (
          <>
            <div className="top-on-card">
              <span style={{ fontSize: ".8rem" }}>
                #
                {currentCollection?.name ||
                  book.collection?.name ||
                  "Sans collection"}
              </span>
            </div>
            <span className="title">
              <span className="book">{book.title}</span>{" "}
              <span className="author-name">de {book.author}</span>
            </span>
            <span className="date">
              Modifié : le {convertToDate(book.updated_at)}
            </span>
            {isCloud && (
              <span className="date">
                Uploadé par : {book.owner?.name || "..."}
              </span>
            )}
          </>
        )}
      </Link>

      {isCloud && auth._id === book.owner._id && (
        <button type="button" onClick={() => del(book._id)}>
          {updating_state ? (
            <Loader height={15} width={15}></Loader>
          ) : (
            <Trash2 size={18} stroke="#000"></Trash2>
          )}
        </button>
      )}
    </div>
  );
};

export default BookElt;
