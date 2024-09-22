import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { InfoIcon } from "../../assets/svg";

const Banner = ({ headerBtn, children }) => {
  const { setCollectionsAppearance, setModalCard } = useAppContext();

  return (
    <section className="banner center">
      <div className="sticky-top for-mobile">
        {headerBtn}
        <Link className="center about-link" to="/about">
          <InfoIcon />
        </Link>
      </div>

      <div className="content center">{children}</div>
    </section>
  );
};

export default Banner;
