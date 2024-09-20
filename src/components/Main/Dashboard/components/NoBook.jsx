import NoData from "../../../../assets/illustrations/NoData";

const NoBook = () => {
  return (
    <div className="no-data-placeholder center">
      <NoData />
      <span className="message">Oups, no book found in this collection !</span>
      <button type="button" className="no-state-button">
        Add a book
      </button>
    </div>
  );
};

export default NoBook;
