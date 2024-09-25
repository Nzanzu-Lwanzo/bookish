import Searching from "../../../../assets/illustrations/Searching";

const CollectionsButNoneSelected = () => {
  return (
    <div className="no-data-placeholder center">
      <Searching />
      <span className="message">
        Vous avez des collections mais aucune n'est séléctionnée.
      </span>
      {/* <Link className="no-state-button" to="/create-book">
        Séléctio
      </Link> */}
    </div>
  );
}

export default CollectionsButNoneSelected