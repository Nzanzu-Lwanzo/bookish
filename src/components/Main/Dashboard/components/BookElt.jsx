import { Link } from "react-router-dom";
import { convertToDate } from "../../../../utils/convertTime";
import { useAppContext } from "../../../../context/AppContext";
import { lsWrite } from "../../../../utils/localStorage-io";

const BookElt = ({book}) => {

  const { setCurrentBook, currentCollection } = useAppContext();

  return (
    <Link to={`/read-book/${book.id}`} className="book-elt" onClick={()=>{
      setCurrentBook(book);
      lsWrite(["bookish-current-book",book])
    }}>
      <span style={{fontSize:".8rem"}}>#{currentCollection.name}</span>
      <span className="title">
        <span className="book">{book.title}</span>{" "}
        <span className="author-name">par {book.author}</span>
      </span>
      <span className="date">Modifié : le {convertToDate(book.updated_at)}</span>
    </Link>
  );
};

export default BookElt;
