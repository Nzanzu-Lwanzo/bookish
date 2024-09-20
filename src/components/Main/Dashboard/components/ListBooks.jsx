import { useAppContext } from "../../../../context/AppContext";
import BookElt from "./BookElt";
import NoBook from "./NoBook";
import { Plus, SearchIcon } from "../../../../assets/svg";

const ListBooks = () => {
  const books = ["Hello World"];

  const { setModalCard } = useAppContext();

  return (
    <div className="list-books">
      <div className="top-bar">
        <h2>The collection name comes here </h2>
        <div className="actions">
          {books.length !== 0 && (
            <>
              <button
                type="button"
                className="no-state-button"
                onClick={() => setModalCard({ type: "SHOW", element: "search-book" })}
              >
                <span>Search</span>
                <span className="center">
                  <SearchIcon />
                </span>
              </button>
              <button
                type="button"
                className="no-state-button"
                onClick={() => setModalCard({ type: "SHOW", element: "book" })}
              >
                <span>Add</span>
                <span className="center">
                  <Plus />
                </span>
              </button>
              <button type="button" className="danger">
                Empty
              </button>
            </>
          )}
        </div>
      </div>

      {books.length !== 0 ? (
        <div className="books">
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
          <BookElt />
        </div>
      ) : (
        <NoBook />
      )}
    </div>
  );
};

export default ListBooks;
