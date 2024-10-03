import { useState } from "react";
import { Trash2, PencilLine, Check, XIcon } from "../../../../assets/svg";
import { useCallback } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { enqueueSnackbar } from "notistack";
import useConfirmDeletion from "../../../../hooks/useConfirmDeletion";

const CollectionElt = ({ name, id, onClick }) => {
  const [updating, setUpdating] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const {
    database,
    setCurrentCollection,
    setCollections,
    currentCollection,
    setBooks,
  } = useAppContext();

  const updateCollectionName = useCallback(
    (event) => {
      setCollectionName(event.target.value);
    },
    [collectionName]
  );

  const { confirmDeletion } = useConfirmDeletion();

  return (
    <li
      onClick={onClick}
      className={`${id === currentCollection?.__id ? "active" : ""}`}
    >
      {updating ? (
        <input
          type="text"
          name="collection-name"
          value={collectionName}
          className="name"
          id="collection-name"
          onInput={updateCollectionName}
          autoFocus={updating}
          placeholder="Changez le nom"
        />
      ) : (
        <span className="name">
          <span>{name}</span>
          <span className="dot-to-mark-active"></span>
        </span>
      )}

      <div className="actions">
        <button
          type="button"
          className="center"
          onClick={async () => {
            let yes = confirmDeletion(`
              Etes-vous sûr(e) de vouloir supprimer la collection ${name} ?
              `);

            if (yes) {
              let deletedId;

              try {
                deletedId = await database.deleteCollection(id);
              } catch (e) {
                enqueueSnackbar("Erreur ! Collection non supprimée !");
              }

              if (deletedId) {
                const collections = await database.getCollections();
                setCollections(collections);
                setCurrentCollection({});

                if (deletedId === currentCollection.__id) {
                  setCurrentCollection(undefined);
                  setBooks([]);
                }
              }
            }
          }}
        >
          <Trash2 />
        </button>
        <button
          type="button"
          className="center"
          onClick={async (event) => {
            setUpdating((prev) => !prev);

            if (updating) {
              try {
                const updatedCollection = await database.updateCollection(id, {
                  name: collectionName,
                });

                const collections = await database.getCollections();
                setCollections(collections);

                setCurrentCollection(updatedCollection);
              } catch (e) {}
            }
          }}
        >
          {!updating ? <PencilLine /> : <Check />}
        </button>
        {updating && (
          <button
            type="button"
            className="center"
            onClick={() => setUpdating(false)}
          >
            <XIcon />
          </button>
        )}
      </div>
    </li>
  );
};

export default CollectionElt;
