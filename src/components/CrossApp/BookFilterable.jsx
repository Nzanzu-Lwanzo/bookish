import { Link } from "react-router-dom";

const BookFilterable = () => {
  return (
    <Link
      to="/read-book/1"
      className="book-filterable"
      onClick={() => setModalCard({ type: "HIDE" })}
    >
      <span>Book title only</span>
    </Link>
  );
};

export default BookFilterable;
