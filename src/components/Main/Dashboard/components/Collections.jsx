import CollectionElt from "./CollectionElt";
import { PlusCircleIcon, TrashIcon, XCircleIcon } from "../../../../assets/svg";
import NoCollection from "./NoCollection";
import { useAppContext } from "../../../../context/AppContext";

const Collections = () => {
  const collections = ["Hello World"];

  const { collectionsAppearance, setCollectionsAppearance, setModalCard } =
    useAppContext();

  return (
    <aside className={`collections ${collectionsAppearance && "show"}`}>
      <div className="title">
        <span>Collections</span>
        <div className="actions">
          <button type="button" className="center">
            <TrashIcon />
          </button>
          <button
            type="button"
            className="center"
            onClick={() => setModalCard({ type: "SHOW", element: "collection" })}
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

      {collections.length !== 0 ? (
        <ul className="list-collections">
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
          <CollectionElt />
        </ul>
      ) : (
        <NoCollection />
      )}
    </aside>
  );
};

export default Collections;
