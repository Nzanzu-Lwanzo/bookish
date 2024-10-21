import { useEffect, useState } from "react";
import ReadCloudBanner from "../components/Cloud/ReadCloudBanner";
import ReadCloudPanel from "../components/Cloud/ReadCloudPannel";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { enqueueSnackbar } from "notistack";
import WholePageLoader from "../components/CrossApp/WholePageLoader";
import { ORIGIN } from "../utils/constants";

const ReadCloud = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [requesting, setRequesting] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    setRequesting(true);
    Axios.get(ORIGIN.concat(`/api/book/${id}`), {
      withCredentials: true,
    })
      .then((response) => {
        setBook(response.data);
      })
      .catch((e) => {
        switch (e.response.status) {
          case 404:
            enqueueSnackbar("Erreur 404 : livre non trouvé !");
            break;
          case 400:
            enqueueSnackbar("Requête invalidée par le serveur !");
            break;
        }

        navigateTo("/cloud");
      })
      .finally(() => setRequesting(false));
  }, []);

  return (
    <>
      {requesting ? (
        <WholePageLoader />
      ) : (
        <>
          <ReadCloudBanner book={book}></ReadCloudBanner>
          <ReadCloudPanel book={book}></ReadCloudPanel>
        </>
      )}
    </>
  );
};

export default ReadCloud;
