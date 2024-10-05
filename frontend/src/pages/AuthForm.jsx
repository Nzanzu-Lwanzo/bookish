import { ArrowLeft, Info, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/CrossApp/Loader";
import { useEffect, useRef } from "react";
import { enqueueSnackbar } from "notistack";

const AuthForm = () => {
  const navigateTo = useNavigate();

  const { isRequesting, requestAuthentication } = useAuth();
  const infoDivRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const user = {
      name: data.get("name"),
      email: data.get("email"),
    };

    if (!user.email || !user.name)
      return enqueueSnackbar("Vous devez fournir les deux données.");

    requestAuthentication(user);
  };

  useEffect(() => {
    /**@type { HTMLDivElement} */
    let div = infoDivRef.current;

    setTimeout(() => {
      div.style.transform = "translateY(100%)";
    }, 8000);
  }, []);

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
              <input type="text" name="name" placeholder="Un nom unique" required />
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

        <div className="infos" ref={infoDivRef}>
          <div className="btns">
            <Info size={20} stroke="#FFF" />
            <X
              size={20}
              stroke="#FFF"
              onClick={() => {
                let div = infoDivRef.current;

                if (div) return (div.style.transform = "translateY(100%)");
              }}
            />
          </div>
          <p style={{ fontSize: ".8rem", lineHeight: "1.2rem" }}>
            {" "}
            ** Ces données permettent de vous associer à vos livres. Si vous
            accédez à la Base de Données cloud à partir de deux appareils
            différents, nous devons savoir que c'est la même personne et qu'il
            faut lui servir ses livres et ses collections.
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
