import NoData from "../../assets/illustrations/NoData";
import { useAppContext } from "../../context/AppContext";
import { useReadPageContext } from "../../context/ReadPageContext";
import { convertToDate } from "../../utils/convertTime";
import ActionsOnBook from "./ActionsOnBook";
import BookResume from "./BookResume";


const ReadPanel = () => {
  const { setModalCard } = useAppContext();
  const { beingReadBook } = useReadPageContext();

  return (
    <section className="read-panel">
      <div className={`content ${!beingReadBook?.resume && "center"}`}>
        {beingReadBook?.resume ? (
          <>
            <ActionsOnBook />
            <BookResume resume={beingReadBook.resume} />
          </>
        ) : (
          <div className="no-data-placeholder center">
            <NoData />
            <span className="message">
              Oups, vous n'avez encore aucun résumé sur ce livre.
            </span>
            <button
              type="button"
              className="no-state-button"
              onClick={() => {
                setModalCard({ type: "SHOW", element: "book" });
              }}
            >
              Ajouter le résumé
            </button>
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
