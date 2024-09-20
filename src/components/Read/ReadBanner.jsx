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
      <h1 id="read-banner" className="read-book-title">
        Title of the book will come right here
      </h1>
      <p>
        <strong className="author-name"> John Doe de la Meunge</strong>
      </p>
      <Link to="/" className="no-state-button cta">Back home</Link>
    </Banner>
  );
}

export default ReadBanner