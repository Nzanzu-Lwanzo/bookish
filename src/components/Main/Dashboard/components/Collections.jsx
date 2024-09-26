import CollectionElt from "./CollectionElt";
import { PlusCircleIcon, TrashIcon, XCircleIcon } from "../../../../assets/svg";
import NoCollection from "./NoCollection";
import { useAppContext } from "../../../../context/AppContext";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import useConfirmDeletion from "../../../../hooks/useConfirmDeletion";
import Loader from "../../../CrossApp/Loader";

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
    currentCollection,
    isFetching,
  } = useAppContext();

  const { confirmDeletion } = useConfirmDeletion();

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

      {collections?.length !== 0 ? (
        <ul className="list-collections">
          {collections?.map((collection) => {
            return (
              <CollectionElt
                key={collection._id}
                name={collection.name}
                id={collection._id}
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
    </aside>
  );
};

export default Collections;
