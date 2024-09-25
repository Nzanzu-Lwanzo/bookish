import { XCircleIcon } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import BookFilterable from "./BookFilterable";
import { useDeferredValue, useEffect, useState } from "react";
import Loader from "./Loader";
import { enqueueSnackbar } from "notistack";

const SearchBook = () => {
  const { setModalCard, database } = useAppContext();

  const [filterables, setFilterables] = useState();
  const [fetching, setFetching] = useState(true);

  const deferredFilterableBooks = useDeferredValue(filterables);

  useEffect(()=>{

    setFetching(true),
      database
        .getAllBooks()
        .then((books) => {
          setFilterables(books);
        })
        .catch((error) => {
          enqueueSnackbar("Erreur ! Réessayez la recherche !");
        })
        .finally(($) => setFetching(false));

  },[])

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

      {fetching ? (
        <div className="center sec-block">
          <Loader height={100} width={100}></Loader>
        </div>
      ) : (
        <>
          <div className="list-books-to-filter sec-block">
            {deferredFilterableBooks?.map((book) => (
              <BookFilterable key={book._id} id={book._id} title={book.title} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBook;
