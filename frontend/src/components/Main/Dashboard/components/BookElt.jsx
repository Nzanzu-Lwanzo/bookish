import { Link } from "react-router-dom";
import { convertToDate } from "../../../../utils/convertTime";
import { useAppContext } from "../../../../context/AppContext";
import { lsWrite } from "../../../../utils/localStorage-io";
import Loader from "../../../CrossApp/Loader";
import { useTransition } from "react";

const BookElt = ({ book }) => {
  const { setCurrentBook, currentCollection } = useAppContext();
  const [pending, setBookToRead] = useTransition();

  return (
    <Link
      to={`/read-book/${book.__id}`}
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
          <span style={{ fontSize: ".8rem" }}>#{currentCollection.name}</span>
          <span className="title">
            <span className="book">{book.title}</span>{" "}
            <span className="author-name">de {book.author}</span>
          </span>
          <span className="date">
            Modifié : le {convertToDate(book.updated_at)}
          </span>
        </>
      )}
    </Link>
  );
};

export default BookElt;
