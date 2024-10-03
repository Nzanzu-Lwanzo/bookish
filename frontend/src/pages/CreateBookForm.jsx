import Parent from "../components/BookForm/Parent";
import RichTextEditor from "../components/Main/Dashboard/components/BookFormComponents/RichTextEditor";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import ActionsOnForm from "../components/BookForm/ActionsOnForm";

const CreateBookForm = () => {

  const { currentCollection } = useAppContext();

  const [resume,setResume] = useState("")

  return (
    <Parent resume={resume}>
      <div className="top-bar">
        <div>
          <h2>Nouveau Livre</h2>
          <span className="cell">{currentCollection?.name}</span>
        </div>

        <ActionsOnForm />
      </div>
      <div className="wrap-inputs">
        <div className="wrap-input">
          <label htmlFor="title">Titre</label>
          <input type="text" name="title" placeholder="Le titre du livre" />
        </div>
        <div className="wrap-input">
          <label htmlFor="author">Auteur</label>
          <input
            type="text"
            name="author"
            maxLength={265}
            placeholder="Qui a écrit ce livre ?"
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
}

export default CreateBookForm