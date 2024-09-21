import CollectionForm from "../Main/Dashboard/components/CollectionForm";
import BookForm from "../Main/Dashboard/components/BookForm";
import SearchBook from "./SearchBook";
import { useAppContext } from "../../context/AppContext";

const Modal = () => {
  const { modalCard } = useAppContext();

  return (
    <section className={`modal-panel center ${modalCard.show && "show"}`}>
      <div className="card custom-scrollbar">
        {modalCard.element === "book" ? (
          <BookForm />
        ) : modalCard.element === "collection" ? (
          <CollectionForm />
        ) : modalCard.element === "search-book" ? (
          <SearchBook />
        ) : null}
      </div>
    </section>
  );
};

export default Modal;
