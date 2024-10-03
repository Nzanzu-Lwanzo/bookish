import NoContent from "../../../../assets/illustrations/NoContent";
import { useAppContext } from "../../../../context/AppContext";

const NoCollection = () => {
  const { setModalCard } = useAppContext();

  return (
    <div className="no-data-placeholder center">
      <NoContent />
      <span className="message">Oups, vous n'avez aucune collection !</span>
      <button
        type="button"
        className="no-state-button"
        onClick={() => setModalCard({ type: "SHOW", element: "collection" })}
      >
        En créer une
      </button>
    </div>
  );
};

export default NoCollection;
