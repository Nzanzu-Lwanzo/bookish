import { XCircleIcon } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import BookFilterable from "./BookFilterable";

const SearchBook = () => {
  const { setModalCard } = useAppContext();

  return (
    <div className="search-book custom-scrollbar">
      <div className="top-bar">
        <input
          type="text"
          name="search-input"
          placeholder="Type to search a book"
          autoCorrect="false"
        />

        <button
          type="button"
          className="center"
          onClick={() => setModalCard({ type: "HIDE" })}
        >
          <XCircleIcon />
        </button>
      </div>

      <div className="list-books-to-filter">
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
        <BookFilterable />
      </div>
    </div>
  );
};

export default SearchBook;
