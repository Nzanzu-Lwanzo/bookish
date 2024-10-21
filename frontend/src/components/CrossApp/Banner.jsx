import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { DatabaseBackup, InfoIcon, Menu, Cloud } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import useSyncDatabase from "../../hooks/useSyncDatabase";
import Loader from "./Loader";

const Banner = ({ headerBtn, children }) => {
  const { auth } = useAppContext();

  const { sync, state_is_updating, is_synchronizing } = useSyncDatabase();

  return (
    <section className="banner center">
      <div className="sticky-top for-mobile">
        <div className="icons-n-buttons">
          {headerBtn}
          <Link className="center about-link" to="/cloud">
            <Cloud />
          </Link>
          <Link className="center about-link" to="/about">
            <InfoIcon />
          </Link>
          {auth ? (
            <button
              className="center about-link"
              type="button"
              onClick={() => sync()}
            >
              {state_is_updating || is_synchronizing ? (
                <Loader height={20} width={20} />
              ) : (
                <DatabaseBackup />
              )}
            </button>
          ) : (
            <Link
              to="/auth"
              className="center about-link"
              type="button"
              onClick={() => {
                enqueueSnackbar("Vous devez d'abord vous connecter.");
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
