import MainBanner from "../components/Main/Dashboard/MainBanner";
import Dashboard from "../components/Main/Dashboard/Dashboard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { lsRead } from "../utils/localStorage-io";

const Main = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const coordinates = lsRead("bookish-main-page-scroll-coordinates");
    window.scrollTo(coordinates?.x || 0, coordinates?.y || 0);
  }, [pathname]);

  return (
    <>
      <MainBanner />
      <Dashboard />
    </>
  );
};

export default Main;
