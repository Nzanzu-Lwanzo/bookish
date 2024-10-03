import NoContent from "../../../../assets/illustrations/NoContent";
import { useAppContext } from "../../../../context/AppContext";
import { Link } from "react-router-dom";

const NoBook = () => {

  const { setModalCard, currentCollection  } = useAppContext();

  return (
    <div className="no-data-placeholder center">
      <NoContent />
      <span className="message">
        Oups, aucun livre trouvé dans cette collection !
      </span>
      <Link className="no-state-button" to="/create-book">
        Ajouter
      </Link>
    </div>
  );
};

export default NoBook;
