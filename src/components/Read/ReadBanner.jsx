import Banner from "../CrossApp/Banner";
import { Link } from "react-router-dom";

const ReadBanner = () => {
  return (
    <Banner
      headerBtn={
        <Link className="no-state-button" to="/">
          Home
        </Link>
      }
    >
      <h1 id="read-beanner" className="read-book-title">
        Title of the book will come right here
      </h1>
      <p>
        <span>by</span>
        <strong className="author-name"> John Doe de la Meunge</strong>
      </p>
      {/* <button
        type="button"
        className="no-state-button cta"
        onClick={() => setModalCard({ type: "SHOW", element: "collection" })}
      >
        Create a book collection
      </button> */}
    </Banner>
  );
}

export default ReadBanner