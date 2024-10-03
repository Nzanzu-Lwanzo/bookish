import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/CrossApp/Loader";

const AuthForm = () => {
  const navigateTo = useNavigate();

  const { isRequesting, requestAuthentication } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const user = {
      name: data.get("name"),
      email: data.get("email"),
    };

    requestAuthentication(user);
  };

  return (
    <>
      <div id="auth-form-page" className="center" onSubmit={handleSubmit}>
        <form className="card">
          <div className="top-bar">
            <div>
              <h2>Se connecter</h2>
            </div>
            <div className="actions">
              <button
                type="button"
                className="action-icon center"
                onClick={() => navigateTo(-1)}
              >
                <ArrowLeft />
              </button>
            </div>
          </div>
          <div className="wrap-inputs">
            <div className="wrap-input">
              <label htmlFor="name">Nom utilisateur</label>
              <input type="text" name="name" placeholder="Votre nom" required />
            </div>
            <div className="wrap-input">
              <label htmlFor="email">Votre e-mail</label>
              <input
                type="email"
                name="email"
                placeholder="Votre adresse e-mail"
              />
            </div>
          </div>
          <button className="no-state-button">
            {!isRequesting ? "Soumettre" : <Loader />}
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthForm;
