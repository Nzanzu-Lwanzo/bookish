import Banner from "../CrossApp/Banner";
import { enqueueSnackbar } from "notistack";

const CloudBanner = () => {
  return (
    <Banner>
      <h1>Bookish</h1>
      <p>
        Accédez aux livres de toute la communauté Bookish, y compris les vôtres
      </p>
      <button
        type="button"
        className="no-state-button cta"
        onClick={() => enqueueSnackbar("Fonctionnalité bientôt disponible !")}
      >
        Voir seulement les miens
      </button>
    </Banner>
  );
};

export default CloudBanner;
