import MainBanner from "../components/Main/Dashboard/MainBanner";
import Dashboard from "../components/Main/Dashboard/Dashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { lsRead, lsWrite } from "../utils/localStorage-io";

const Main = () => {
  const { pathname } = useLocation();

  const navigateTo = useNavigate();

  useEffect(() => {
    let hasReadAboutPage = lsRead("bookish-has-read-about-page");

    if (!hasReadAboutPage) {
      return navigateTo("/about");
    }
  }, []);

  useEffect(() => {
    lsWrite(["bookish-current-book", undefined]);
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
