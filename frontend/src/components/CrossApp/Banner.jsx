import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { DatabaseBackup, InfoIcon, Menu } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import useSyncDatabase from "../../hooks/useSyncDatabase";

const Banner = ({ headerBtn, children }) => {
  const { auth } = useAppContext();

  const { sync } = useSyncDatabase();

  return (
    <section className="banner center">
      <div className="sticky-top for-mobile">
        <div className="icons-n-buttons">
          {headerBtn}
          <Link className="center about-link" to="/about">
            <InfoIcon />
          </Link>
          {auth ? (
            <button
              className="center about-link"
              type="button"
              onClick={() => {
                // enqueueSnackbar("Synchroniser avec la BDD cloud");
                // enqueueSnackbar("Fonctionnalité bientôt disponible");
                sync();
              }}
            >
              <DatabaseBackup />
            </button>
          ) : (
            <Link
              to="/auth"
              className="center about-link"
              type="button"
              onClick={() => {
                enqueueSnackbar("Vous devez d'abord vous connectez.");
              }}
            >
              <DatabaseBackup />
            </Link>
          )}
        </div>
      </div>

      <div className="content center">{children}</div>
    </section>
  );
};

export default Banner;
