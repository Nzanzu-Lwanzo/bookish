import { Link } from "react-router-dom";

const BookFilterable = ({title,id}) => {
  return (
    <Link
      to={`/read-book/${id}`}
      className="book-filterable"
      onClick={() => setModalCard({ type: "HIDE" })}
    >
      <span>{title}</span>
    </Link>
  );
};

export default BookFilterable;
