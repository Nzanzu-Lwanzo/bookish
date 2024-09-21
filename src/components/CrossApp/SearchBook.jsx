import { XCircleIcon } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import BookFilterable from "./BookFilterable";
import { useDeferredValue, useState } from "react";
import { useEffect } from "react";

const SearchBook = () => {
  const { setModalCard, books } = useAppContext();

  const [filterables, setFilterables] = useState([...books]);

  const deferredFilterableBooks = useDeferredValue(filterables);

  return (
    <div className="search-book custom-scrollbar">
      <div className="top-bar">
        <input
          type="text"
          name="search-input"
          placeholder="Cherchez un livre "
          autoCorrect="false"
          onInput={(event) => {
            setFilterables(
              /**@param {Array} prev */
              (prev) => {
                return books?.filter((book) => {
                  return book.title
                    ?.toLowerCase()
                    .includes(event.target.value.toLowerCase());
                });
              }
            );
          }}
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
        {deferredFilterableBooks?.map((book) => (
          <BookFilterable key={book.id} id={book.id} title={book.title} />
        ))}
      </div>
    </div>
  );
};

export default SearchBook;
