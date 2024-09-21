import NoContent from "../../../../assets/illustrations/NoContent";
import { useAppContext } from "../../../../context/AppContext";

const NoBook = () => {

  const { setModalCard  } = useAppContext();

  return (
    <div className="no-data-placeholder center">
      <NoContent />
      <span className="message">
        Oups, aucun livre trouvé dans cette collection !
      </span>
      <button
        type="button"
        className="no-state-button"
        onClick={() => setModalCard({ type: "SHOW", element: "book" })}
      >
        Ajouter
      </button>
    </div>
  );
};

export default NoBook;
