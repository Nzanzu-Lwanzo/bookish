import CollectionElt from "./CollectionElt";
import { PlusCircleIcon, TrashIcon, XCircleIcon } from "../../../../assets/svg";
import NoCollection from "./NoCollection";
import { useAppContext } from "../../../../context/AppContext";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

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
  } = useAppContext();

  return (
    <aside className={`collections ${collectionsAppearance && "show"}`}>
      <div className="title">
        <span>Collections</span>
        <div className="actions">
          <button
            type="button"
            className="center"
            onClick={async () => {
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

      {collections?.length !== 0 ? (
        <ul className="list-collections">
          {collections?.map((collection) => (
            <CollectionElt
              key={collection.id}
              name={collection.name}
              id={collection.id}
              onClick={async (event) => {
                if (!event.target.matches("button *")) {
                  setCurrentCollection(collection);
                  setCollectionsAppearance(false);
                }
              }}
            />
          ))}
        </ul>
      ) : (
        <NoCollection />
      )}
    </aside>
  );
};

export default Collections;
