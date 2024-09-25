import NoData from "../../assets/illustrations/NoData";
import { useAppContext } from "../../context/AppContext";
import { useReadPageContext } from "../../context/ReadPageContext";
import { convertToDate } from "../../utils/convertTime";
import ActionsOnBook from "./ActionsOnBook";
import BookResume from "./BookResume";
import { Link } from "react-router-dom";

const ReadPanel = () => {
  const { setModalCard, setCurrentBook } = useAppContext();
  const { beingReadBook } = useReadPageContext();

  return (
    <section className="read-panel">
      <div className={`content ${!beingReadBook?.resume && "center"}`}>
        <ActionsOnBook />
        {beingReadBook?.resume ? (
          <>
            <BookResume
              title={beingReadBook?.title}
              resume={beingReadBook.resume}
            />
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
              to={`/update-book/${beingReadBook?._id}`}
              onClick={() => {
                setCurrentBook(beingReadBook);
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

export default ReadPanel;
