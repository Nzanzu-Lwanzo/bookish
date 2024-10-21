import NoData from "../../assets/illustrations/NoData";
import { useAppContext } from "../../context/AppContext";
import { useReadPageContext } from "../../context/ReadPageContext";
import { convertToDate } from "../../utils/convertTime";
import ActionsOnBook from "../Read/ActionsOnBook";
import BookResume from "../Read/BookResume";
import { Link } from "react-router-dom";
import ActionsOnBookCloud from "./ActionsOnBookCloud";

const ReadCloudPanel = ({ book }) => {
  return (
    <section className="read-panel">
      <ActionsOnBookCloud />
      <div className={`content ${!book?.resume && "center"}`}>
        {/* <ActionsOnBook /> */}
        {book?.resume ? (
          <>
            <BookResume title={book?.title} resume={book?.resume} />
          </>
        ) : (
          <div className="no-data-placeholder center">
            <NoData />
            <span className="message">
              Oups, vous n'avez encore aucun résumé sur ce livre.
            </span>
            <Link
              type="button"
              className="no-state-button"
              to={`/update-book/${book?.__id}`}
              onClick={() => {
                setCurrentBook(book);
                return;
              }}
            >
              Ajouter le résumé
            </Link>
          </div>
        )}
        <div className="quote">
          <p>
            Un lecteur vit mille vies avant de mourir. L'homme qui ne lit pas
            n'en vit qu'une.
          </p>
          <span className="author">Georges RR Martin</span>
        </div>
      </div>
    </section>
  );
};

export default ReadCloudPanel;
