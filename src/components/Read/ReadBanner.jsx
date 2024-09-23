import { useAppContext } from "../../context/AppContext";
import { useReadPageContext } from "../../context/ReadPageContext";
import Banner from "../CrossApp/Banner";
import { Link } from "react-router-dom";

const ReadBanner = () => {
  const { setCurrentBook } = useAppContext();
  const { beingReadBook } = useReadPageContext();

  return (
    <Banner
      headerBtn={
        <Link
          className="no-state-button"
          to="/"
          onClick={() => setCurrentBook(undefined)}
        >
          Accueil
        </Link>
      }
    >
      <h1 id="read-banner" className="read-book-title">
        {beingReadBook?.title}
      </h1>
      <p>
        <span className="author-name">{beingReadBook?.author}</span>
      </p>
      {/* <Link
        to="/"
        className="no-state-button cta"
        onClick={() => setCurrentBook(undefined)}
      >
        Accueil
      </Link> */}
    </Banner>
  );
}

export default ReadBanner