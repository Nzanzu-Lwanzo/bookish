import React, { useState, useTransition } from "react";
import AddDocument from "../../assets/illustrations/AddDocument";
import { useAppContext } from "../../context/AppContext";
import BookFormBanner from "./BookFormBanner";
import UpdateDocument from "../../assets/illustrations/UpdateDocument";
import Loader from "../CrossApp/Loader";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { lsWrite } from "../../utils/localStorage-io";

const Parent = ({ children, is_update = false, resume, bid }) => {
  const { database, currentCollection, currentBook, setBooks, setCurrentBook } =
    useAppContext();
  const [isRegistering, setIsRegistering] = useState(false);
  const navigateTo = useNavigate();
  const [pending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsRegistering(true);

    const submittedData = new FormData(e.target);

    const data = {
      title: submittedData.get("title"),
      author: submittedData.get("author"),
      resume: resume,
    };

    try {
      if (!is_update) {
        const savedBook = await database.createBook(
          data,
          currentCollection?._id
        );

        startTransition(() => {
          setCurrentBook(savedBook);
          setBooks((prev) => [savedBook, ...prev]);
        });

        if (savedBook) {
          navigateTo(`/read-book/${savedBook._id}`);
        }

        lsWrite(["bookish-current-book", savedBook]);

        enqueueSnackbar(`Un livre a été ajouté !`);
      } else {
        const savedBook = await database.updateBook(bid, data);

        startTransition(() => {
          setBooks(
            /**@param {Array} prev */
            (prev) => {
              let oldBookIdx = prev.findIndex(
                (book) => book?._id === savedBook._id
              );
              if (oldBookIdx < 0) return;

              prev.splice(oldBookIdx, 1, savedBook);
              return prev;
            }
          );

          setCurrentBook(savedBook);
        });

        if (savedBook) {
          navigateTo(`/read-book/${savedBook._id}`);
        }

        lsWrite(["bookish-current-book", savedBook]);

        enqueueSnackbar(`Ce livre a été mis à jour.`);
      }

      setIsRegistering(false);
    } catch (e) {
      enqueueSnackbar("Erreur ! Livre non enregistré !");
    }
  };

  return (
    <main id="wrap-book-form-page">
      <div className="illustration center">
        {!is_update ? (
          <AddDocument width="400" height="400" />
        ) : (
          <UpdateDocument width="400" height="400" />
        )}
      </div>
      <BookFormBanner />
      <form action="#" id="book-form" onSubmit={handleSubmit}>
        {children}

        <button
          type="submit"
          className={true ? "no-state-button" : "disabled-button"}
        >
          {!isRegistering && !pending ? "Enregistrer" : <Loader />}
        </button>
      </form>
    </main>
  );
};

export default Parent;
