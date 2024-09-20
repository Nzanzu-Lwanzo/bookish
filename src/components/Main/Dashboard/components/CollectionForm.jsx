import { useState } from "react";
import { XCircleIcon } from "../../../../assets/svg";
import { useAppContext } from "../../../../context/AppContext";

const CollectionForm = () => {

  const { setModalCard } = useAppContext();

  const [collection, setCollection] = useState({
    name: "",
    description: "",
  });

  const [fieldMissingError, setFieldMissingError] = useState(false);

  const saveCollection = (e) => {
    e.preventDefault();

    if (!collection.name) {
        setFieldMissingError(true);
        return
    }

    // Save and hide form
    console.log(collection)
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
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Put a descriptive name"
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
            placeholder="Shortly describe your collection"
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
          Submit
        </button>
      </div>
    </form>
  );
};

export default CollectionForm;
