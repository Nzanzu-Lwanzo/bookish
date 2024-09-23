import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { DatabaseBackup, InfoIcon } from "lucide-react";
import { enqueueSnackbar } from "notistack";

const Banner = ({ headerBtn, children }) => {
  const { setCollectionsAppearance, setModalCard } = useAppContext();

  return (
    <section className="banner center">
      <div className="sticky-top for-mobile">
        <div className="icons-n-buttons">
          {headerBtn}
          <Link className="center about-link" to="/about">
            <InfoIcon />
          </Link>
          <button className="center about-link" type="button" onClick={()=>{
            enqueueSnackbar("Synchroniser avec la BDD cloud")
            enqueueSnackbar("Fonctionnalité bientôt disponible");
          }}>
            <DatabaseBackup />
          </button>
        </div>
      </div>

      <div className="content center">{children}</div>
    </section>
  );
};

export default Banner;
