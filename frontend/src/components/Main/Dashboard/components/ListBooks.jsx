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
import CollectionsButNoneSelected from "./CollectionsButNoneSelected";
import Loader from "../../../CrossApp/Loader";

const ListBooks = () => {
  const {
    setModalCard,
    currentCollection,
    books,
    database,
    setBooks,
    collections,
  } = useAppContext();
  const { fetcher, fetchingBooks } = useGetCollectionBooks();

  const { element } = useShowNetworkStatus();

  const { confirmDeletion } = useConfirmDeletion();

  useEffect(() => {
    async function fn() {
      fetcher(currentCollection?.__id);
    }

    fn();
  }, [currentCollection]);

  let thereAreCollections = collections?.length !== 0;
  let thereAreNoBooksInCurrentCollection =
    thereAreCollections && currentCollection && books?.length === 0;
  let thereAreCollectionsButNoneSelected =
    thereAreCollections && !currentCollection;

  return (
    <div className="list-books">
      <div className="top-bar">
        <h2>{currentCollection?.name}</h2>
        <div className="actions">
          {thereAreCollections && currentCollection && (
            <Link className="no-state-button" to="/create-book">
              <span>Ajouter</span>
              <span className="center">
                <Plus />
              </span>
            </Link>
          )}

          {currentCollection && books?.length !== 0 && (
            <>
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
                          currentCollection.__id
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
          )}

          {element}

          {fetchingBooks && (
            <div className="center">
              <Loader height={25} width={25}></Loader>
            </div>
          )}
        </div>
      </div>

      {books?.length !== 0 ? (
        <div className="books">
          {books?.map((book) => {
            return <BookElt key={book.__id} book={book} />;
          })}
        </div>
      ) : thereAreNoBooksInCurrentCollection ? (
        <NoBook />
      ) : thereAreCollectionsButNoneSelected ? (
        <CollectionsButNoneSelected />
      ) : !thereAreCollections ? (
        <NoCollection />
      ) : null}
    </div>
  );
};

export default ListBooks;
