import { useAppContext } from "../../../context/AppContext";
import Banner from "../../CrossApp/Banner";

const MainBanner = () => {
  const { setCollectionsAppearance, setModalCard } = useAppContext();

  return (
    <Banner
      headerBtn={
        <button
          className="no-state-button"
          onClick={() => setCollectionsAppearance(true)}
        >
          Mes collections
        </button>
      }
    >
      <h1>Bookish</h1>
      <p>
        Combattre l'ignorance, empêcher le monde de s'écrouler, planter la
        graine d'un meilleur avenir.
      </p>
      <button
        type="button"
        className="no-state-button cta"
        onClick={() => setModalCard({ type: "SHOW", element: "collection" })}
      >
        Créer une collection
      </button>
    </Banner>
  );
};

export default MainBanner;
