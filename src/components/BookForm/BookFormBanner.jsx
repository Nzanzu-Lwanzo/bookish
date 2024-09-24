import Banner from "../CrossApp/Banner";
import { Link } from "react-router-dom";

const BookFormBanner = () => {
  

  return (
    <Banner>
      <h1>Bookish</h1>
      <p>
        Chaque livre est un petit pas pour vous mais un grand pas pour
        l'humanité.
      </p>

      <Link
        className="no-state-button cta"
        to="/"
      >
        Accueil
      </Link>
    </Banner>
  );
};

export default BookFormBanner;
