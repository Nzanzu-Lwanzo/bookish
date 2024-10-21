import React from "react";
import Loader from "../CrossApp/Loader";
import BookElt from "../Main/Dashboard/components/BookElt";
import NoBook from "../Main/Dashboard/components/NoBook";
import { useGetAllBooks } from "../../hooks/useCloud";
import { useAppContext } from "../../context/AppContext";

const Books = () => {
  const { data, isPending, isSuccess, isError, error, updating_state } =
    useGetAllBooks();
  const { cloudBooks } = useAppContext();
  return (
    <>
      {isPending || updating_state ? (
        <div className="center _loader">
          <Loader height={100} width={100}></Loader>
        </div>
      ) : isSuccess ? (
        <div className="books">
          {cloudBooks?.map((book) => {
            return <BookElt key={book._id} book={book} isCloud={true} />;
          })}
        </div>
      ) : isError ? (
        <div className="center _loader">
          <NoBook message={error.message} showBtn={false}></NoBook>
        </div>
      ) : null}
    </>
  );
};

export default Books;
