import Parent from "../components/BookForm/Parent";
import RichTextEditor from "../components/Main/Dashboard/components/BookFormComponents/RichTextEditor";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { lsRead } from "../utils/localStorage-io";
import ActionsOnForm from "../components/BookForm/ActionsOnForm";

const UpdateBookForm = () => {
  const { currentCollection } = useAppContext();

  const currentBook = lsRead("bookish-current-book");

  const [resume, setResume] = useState(currentBook?.resume);

  return (
    <Parent resume={resume} is_update={true} bid={currentBook?._id}>
      <div className="top-bar">
        <div>
          <h2>Mettre A Jour</h2>
          <span className="cell">{currentBook?.title}</span>
        </div>
        <ActionsOnForm />
      </div>
      <div className="wrap-inputs">
        <div className="wrap-input">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            name="title"
            placeholder="Le titre du livre"
            defaultValue={currentBook?.title}
          />
        </div>
        <div className="wrap-input">
          <label htmlFor="author">Auteur</label>
          <input
            type="text"
            name="author"
            maxLength={265}
            placeholder="Qui a écrit ce livre ?"
            defaultValue={currentBook?.author}
          />
        </div>
        <div className="wrap-input">
          <label htmlFor="resume">Resumé</label>
          <RichTextEditor
            model={resume}
            title="Que voulez-vous retenir de ce livre ?"
            handleModelChange={setResume}
          />
        </div>
      </div>
    </Parent>
  );
};

export default UpdateBookForm;
