import { useState } from "react";
import { XCircleIcon } from "../../../../assets/svg";
import { useAppContext } from "../../../../context/AppContext";

const BookForm = () => {

  const { setModalCard } = useAppContext();

  const [book, setBook] = useState({
    title: "",
    author: "",
    resume: "",
  });

  const [fieldMissingError, setFieldMissingError] = useState(false);

  const saveBook = (e) => {
    e.preventDefault();

    if (!book.title || !book.resume) {
      setFieldMissingError(true);
      return;
    }

    // Save and hide form
    console.log(book);
  };

  return (
    <form
      action="#"
      id="book-form"
      className="dashboard-form"
      onSubmit={saveBook}
    >
      <div className="top-bar">
        <h2>Book</h2>

        <button type="button" className="center" onClick={()=>setModalCard({type:'HIDE'})}>
          <XCircleIcon />
        </button>
      </div>

      <div className="wrap-inputs">
        <div className="wrap-input">
          <label htmlFor="title">Title **</label>
          <input
            type="text"
            name="title"
            placeholder="Put the title of the book"
            onInput={(e) => {
              setBook((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </div>
        <div className="wrap-input">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            placeholder="Who's the author of the book"
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
          <label htmlFor="resume">Resume **</label>
          <textarea
            name="resume"
            id="resume"
            placeholder="What do you wann write down about this book"
          ></textarea>
        </div>

        <button
          type="submit"
          className={book.name ? "no-state-button" : "disabled-button"}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BookForm;
