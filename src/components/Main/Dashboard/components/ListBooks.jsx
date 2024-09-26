import { useAppContext } from "../../../../context/AppContext";
import BookElt from "./BookElt";
import NoBook from "./NoBook";
import NoCollection from "./NoCollection";
import { Plus, SearchIcon, Trash2 } from "../../../../assets/svg";
import { useEffect } from "react";
import { useGetCollectionBooks } from "../../../../hooks/useGet";
import { enqueueSnackbar } from "notistack";
import useShowNetworkStatus from "../../../../hooks/useShowNetworkStatus";
import { Link } from "react-router-dom";
import useConfirmDeletion from "../../../../hooks/useConfirmDeletion";

const ListBooks = () => {
  const { setModalCard, currentCollection, books, database, setBooks } =
    useAppContext();
  const { fetcher } = useGetCollectionBooks();

  const { element } = useShowNetworkStatus();

  const { confirmDeletion } = useConfirmDeletion();

  useEffect(() => {
    async function fn() {
      fetcher(currentCollection?._id);
    }

    fn();
  }, [currentCollection]);

  return (
    <div className="list-books">
      <div className="top-bar">
        <h2>{currentCollection?.name}</h2>
        <div className="actions">
          {books?.length ? (
            <>
              <Link className="no-state-button" to="/create-book">
                <span>Ajouter</span>
                <span className="center">
                  <Plus />
                </span>
              </Link>

              <button
                type="button"
                className="action-icon ok center"
                onClick={() =>
                  setModalCard({ type: "SHOW", element: "search-book" })
                }
              >
                <SearchIcon />
              </button>

              <button
                type="button"
                className="center action-icon no"
                onClick={async () => {
                  let yes = confirmDeletion(
                    "Etes-vous sûr(e) de vouloir supprimer tous les livres de cette collection ?"
                  );

                  if (yes) {
                    let deletedBooksOnCollection;
                    try {
                      deletedBooksOnCollection =
                        await database.removeBookFromCollection(
                          currentCollection._id
                        );
                    } catch (e) {
                      enqueueSnackbar("Erreur ! Livres non supprmés !");
                    }

                    if (deletedBooksOnCollection) {
                      setBooks([]);
                    }
                  }
                }}
              >
                <Trash2 />
              </button>
            </>
          ) : null}

          {element}
        </div>
      </div>

      {books?.length !== 0 ? (
        <div className="books">
          {books?.map((book) => {
            return <BookElt key={book._id} book={book} />;
          })}
        </div>
      ) : currentCollection ? (
        <NoBook />
      ) : (
        <NoCollection />
      )}
    </div>
  );
};

export default ListBooks;
