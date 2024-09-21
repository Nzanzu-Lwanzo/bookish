import { useState } from "react";
import { XCircleIcon } from "../../../../assets/svg";
import { useAppContext } from "../../../../context/AppContext";

const BookForm = () => {
  const {
    setModalCard,
    database,
    currentCollection,
    setCurrentBook,
    setBooks,
  } = useAppContext();

  const [book, setBook] = useState({
    title: "",
    author: "",
    resume: "",
  });

  const [fieldMissingError, setFieldMissingError] = useState(false);

  const saveBook = async (e) => {
    e.preventDefault();

    if (!book.title) {
      setFieldMissingError(true);
      return;
    }

    // Save and hide form
    const savedBook = await database.createBook(book, currentCollection?.id);

    if (savedBook) {
       setCurrentBook(savedBook);
       setBooks((prev) => [savedBook, ...prev]);
       setModalCard({ type: "HIDE" });
       setBook({
         author: "",
         resume: "",
         title: "",
       });
     }
  };

  return (
    <form
      action="#"
      id="book-form"
      className="dashboard-form"
      onSubmit={saveBook}
    >
      <div className="top-bar">
        <div>
          <h2>Livre</h2>
          <span className="cell">{currentCollection?.name}</span>
        </div>

        <button
          type="button"
          className="center"
          onClick={() => setModalCard({ type: "HIDE" })}
        >
          <XCircleIcon />
        </button>
      </div>

      <div className="wrap-inputs">
        <div className="wrap-input">
          <label htmlFor="title">Titre **</label>
          <input
            type="text"
            name="title"
            placeholder="Le titre du livre"
            onInput={(e) => {
              setBook((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </div>
        <div className="wrap-input">
          <label htmlFor="author">Auteur</label>
          <input
            type="text"
            name="author"
            placeholder={`Qui a écrit ${
              book.title ? book.title : "ce livre"
            } ?`}
            maxLength={265}
            onInput={(e) => {
              setBook((prev) => ({
                ...prev,
                author: e.target.value,
              }));
            }}
          />
        </div>
        <div className="wrap-input">
          <label htmlFor="resume">Resumé</label>
          <textarea
            name="resume"
            id="resume"
            placeholder={`Que voulez-vous retenir ${
              book.title ? "du livre ".concat(book.title) : "de ce livre"
            } ?`}
          ></textarea>
        </div>

        <button
          type="submit"
          className={book.title ? "no-state-button" : "disabled-button"}
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default BookForm;
