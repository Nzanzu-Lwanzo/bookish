import CollectionElt from "./CollectionElt";
import { PlusCircleIcon, TrashIcon, XCircleIcon } from "../../../../assets/svg";
import NoCollection from "./NoCollection";
import { useAppContext } from "../../../../context/AppContext";
import { enqueueSnackbar } from "notistack";
import useConfirmDeletion from "../../../../hooks/useConfirmDeletion";
import Loader from "../../../CrossApp/Loader";
import { lsWrite } from "../../../../utils/localStorage-io";

const Collections = () => {
  const {
    collectionsAppearance,
    setCollectionsAppearance,
    setModalCard,
    collections,
    setCurrentCollection,
    database,
    setCollections,
    setBooks,
    isFetchingFromIDB: { collections_are_fetched },
  } = useAppContext();

  const { confirmDeletion } = useConfirmDeletion();

  let stillFetchingCollections = !collections_are_fetched;

  return (
    <aside className={`collections ${collectionsAppearance && "show"}`}>
      <div className="title">
        <span>Collections</span>
        <div className="actions">
          <button
            type="button"
            className="center"
            onClick={async () => {
              let yes = confirmDeletion(
                `Etes-vous sûr(e) de vouloir supprimer toutes vos collections ?`
              );

              if (yes) {
                let areAllDeleted;
                try {
                  areAllDeleted = await database.deleteAllCollections();
                } catch (e) {
                  enqueueSnackbar("Erreur ! Collections non supprimées !");
                }

                if (areAllDeleted) {
                  setCurrentCollection(undefined);
                  setBooks([]);
                  setCollections([]);

                  lsWrite(["last-collection-id", undefined]);
                  lsWrite(["last-book-id", undefined]);
                }
              }
            }}
          >
            <TrashIcon />
          </button>
          <button
            type="button"
            className="center"
            onClick={() =>
              setModalCard({ type: "SHOW", element: "collection" })
            }
          >
            <PlusCircleIcon />
          </button>
          <button
            type="button"
            className="center for-mobile hide-sidebar"
            onClick={() => setCollectionsAppearance(false)}
          >
            <XCircleIcon />
          </button>
        </div>
      </div>
      {stillFetchingCollections ? (
        <div className="center" style={{ height: "100%", flex: "2" }}>
          <Loader
            height={50}
            width={50}
            ringColor="#FFF"
            trackColor="#15d846"
          />
        </div>
      ) : (
        <>
          {collections?.length !== 0 ? (
            <ul className="list-collections">
              {collections?.map((collection) => {
                return (
                  <CollectionElt
                    key={collection.__id}
                    name={collection.name}
                    id={collection.__id}
                    onClick={async (event) => {
                      if (!event.target.matches("button *")) {
                        setCurrentCollection(collection);
                        setCollectionsAppearance(false);
                      }
                    }}
                  />
                );
              })}
            </ul>
          ) : (
            <NoCollection />
          )}
        </>
      )}
    </aside>
  );
};

export default Collections;
