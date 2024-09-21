import { useState } from "react";
import { XCircleIcon } from "../../../../assets/svg";
import { useAppContext } from "../../../../context/AppContext";

const CollectionForm = () => {

  const {
    setModalCard,
    database,
    setCurrentCollection,
    setCollections,
    setCollectionsAppearance,
  } = useAppContext();

  const [collection, setCollection] = useState({
    name: "",
    description: "",
  });

  const [fieldMissingError, setFieldMissingError] = useState(false);

  const saveCollection = async (e) => {
    e.preventDefault();

    if (!collection.name) {
        setFieldMissingError(true);
        return
    }

    // Save and hide form
    const savedCollection = await database.createCollection(collection);

    if(savedCollection) {
      setCurrentCollection(savedCollection);
      setCollections(prev=>[savedCollection,...prev]);
      setModalCard({type:"HIDE"})
      setCollection({
        description : "",
        name : ""
      })
      setCollectionsAppearance(true);
    }
  };

  return (
    <form
      action="#"
      id="collection-form"
      className="dashboard-form"
      onSubmit={saveCollection}
    >
      <div className="top-bar">
          <h2>Collection</h2>

        <button
          type="button"
          className="center"
          onClick={() => setModalCard({ type: "HIDE" })}
        >
          <XCircleIcon />
        </button>
      </div>

      <div className="wrap-inputs">
        <div className="wrap-input">
          <label htmlFor="name">Nom *</label>
          <input
            type="text"
            name="name"
            placeholder="Le nom de votre collection"
            maxLength={64}
            onInput={(e) => {
              setCollection((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
          <span
            className="error"
            style={{
              display: `${!fieldMissingError ? "none" : "inline"}`,
            }}
          >
            ** The name field is mandatory
          </span>
        </div>
        <div className="wrap-input">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Courte description de votre collection"
            maxLength={265}
            onInput={(e) => {
              setCollection((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
        </div>

        <button
          type="submit"
          className={collection.name ? "no-state-button" : "disabled-button"}
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default CollectionForm;
