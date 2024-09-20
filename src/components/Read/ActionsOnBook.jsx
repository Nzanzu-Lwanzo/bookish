import { Trash2, PencilLine, DownoladIcon } from "../../assets/svg";

const ActionsOnBook = () => {

  return (
    <div className="actions-on-book">
      <button type="button" className="action-icon center">
        <Trash2 />
      </button>
      <button type="button" className="action-icon center">
        <DownoladIcon />
      </button>
      <button type="button" className="action-icon center">
        <PencilLine />
      </button>
    </div>
  );
}

export default ActionsOnBook