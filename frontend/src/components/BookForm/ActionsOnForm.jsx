import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionsOnForm = () => {

    const navigateTo = useNavigate();

  return (
    <div className="actions-to-navigate">
      <button className="center action-icon" type="button" onClick={()=>navigateTo(-1)}>
        <ArrowLeft />
      </button>
      <Link className="center action-icon" to="/">
        <Home />
      </Link>
    </div>
  );
}

export default ActionsOnForm