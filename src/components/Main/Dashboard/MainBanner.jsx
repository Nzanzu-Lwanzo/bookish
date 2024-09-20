import { useAppContext } from "../../../context/AppContext";
import Banner from "../../CrossApp/Banner"

const MainBanner = () => {

    const { setCollectionsAppearance, setModalCard } = useAppContext();

  return (
    <Banner
      headerBtn={
        <button
          className="no-state-button"
          onClick={() => setCollectionsAppearance(true)}
        >
          My collections
        </button>
      }
    >
      <h1>Bookish</h1>
      <p>
        Let's combat ignorance, let's save the world from rumbling down, let's
        spark the light of a brighter future
      </p>
      <button
        type="button"
        className="no-state-button cta"
        onClick={() => setModalCard({ type: "SHOW", element: "collection" })}
      >
        Create a book collection
      </button>
    </Banner>
  );
}

export default MainBanner