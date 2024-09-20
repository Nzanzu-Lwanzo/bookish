import NoData from "../../../../assets/illustrations/NoData";

const NoCollection = () => {
  return (
    <div className="no-data-placeholder center">
      <NoData />
      <span className="message">Oups, no collection found !</span>
      <button type="button" className="no-state-button">
        Add a collection
      </button>
    </div>
  );
};

export default NoCollection;
