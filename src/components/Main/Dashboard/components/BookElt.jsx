import { Link } from "react-router-dom";

const BookElt = () => {
  let id = 2;

  return (
    <Link to={`/read-book/${id}`} className="book-elt">
      <span className="title">
        <span className="book">Book Title is going right here</span>{" "}
        <span className="author-name">by John Doe</span>
      </span>
      <span className="date">Last modified : 12 septembre 2024</span>
    </Link>
  );
};

export default BookElt;
