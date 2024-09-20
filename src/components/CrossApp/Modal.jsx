import CollectionForm from "../Main/Dashboard/components/CollectionForm";
import BookForm from "../Main/Dashboard/components/BookForm";
import { useAppContext } from "../../context/AppContext";

const Modal = () => {
  const { modalCard } = useAppContext();

  return (
    <section className={`modal-panel center ${modalCard.show && "show"}`}>
      <div className="card">
        {modalCard.element === "book" ? (
          <BookForm />
        ) : modalCard.element === "collection" ? (
          <CollectionForm />
        ) : null}
      </div>
    </section>
  );
};

export default Modal;
