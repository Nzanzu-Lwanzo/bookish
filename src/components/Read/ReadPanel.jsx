import NoContent from "../../assets/illustrations/NoContent";
import { useAppContext } from "../../context/AppContext";
import ActionsOnBook from "./ActionsOnBook";

const ReadPanel = () => {
  const resume = `
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit suscipit commodi mollitia, maxime iure est quis possimus repellendus libero dolore. Dignissimos expedita tempore veniam velit commodi iusto quas, labore nihil.

    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit suscipit commodi mollitia, maxime iure est quis possimus repellendus libero dolore. Dignissimos expedita tempore veniam velit commodi iusto quas, labore nihil.


    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit suscipit commodi mollitia, maxime iure est quis possimus repellendus libero dolore. Dignissimos expedita tempore veniam velit commodi iusto quas, labore nihil.


    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit suscipit commodi mollitia, maxime iure est quis possimus repellendus libero dolore. Dignissimos expedita tempore veniam velit commodi iusto quas, labore nihil.

  `;
  const { setModalCard } = useAppContext();
  
  return (
    <section className="read-panel">
      <div className={`content ${!resume && "center"}`}>
        {resume ? (
          <>
            <ActionsOnBook />
            <p>{resume}</p>
          </>
        ) : (
          <div className="no-data-placeholder center">
            <NoContent />
            <span className="message">
              Oups, you have got no resume about this book !
            </span>
            <button
              type="button"
              className="no-state-button"
              onClick={() => {
                setModalCard({ type: "SHOW", element: "book" });
              }}
            >
              Add some content
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReadPanel;
