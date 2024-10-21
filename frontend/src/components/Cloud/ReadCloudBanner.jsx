import Banner from "../CrossApp/Banner";
import { Link } from "react-router-dom";

const ReadCloudBanner = ({ book }) => {
  return (
    <Banner
      headerBtn={
        <Link className="no-state-button" to="/">
          Accueil
        </Link>
      }
    >
      <h1 id="read-banner" className="read-book-title">
        {book?.title}
      </h1>
      <p>
        <span className="author-name">{book?.owner?.name}</span>
      </p>
      <span className="collection-name">#{book?.collection?.name}</span>
      {/* <Link
        to="/cloud"
        className="no-state-button cta"
      >
        Tous les livres
      </Link> */}
    </Banner>
  );
};

export default ReadCloudBanner;
