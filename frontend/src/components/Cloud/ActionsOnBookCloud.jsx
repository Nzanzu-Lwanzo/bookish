import { House } from "lucide-react";
import { Link } from "react-router-dom";

const ActionsOnBookCloud = () => {
  return (
    <div className="actions-on-book" style={{ paddingInline: "1rem" }}>
      <Link type="button" className="action-icon center ok" to={`/cloud`}>
        <House />
      </Link>
    </div>
  );
};

export default ActionsOnBookCloud;
