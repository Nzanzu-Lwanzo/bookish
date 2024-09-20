import { useAppContext } from "../../context/AppContext";

const Banner = ({ headerBtn, children }) => {
  const { setCollectionsAppearance, setModalCard } = useAppContext();

  return (
    <section className="banner center">
      <div className="sticky-top for-mobile">
        {headerBtn}
      </div>

      <div className="content center">{children}</div>
    </section>
  );
};

export default Banner;
