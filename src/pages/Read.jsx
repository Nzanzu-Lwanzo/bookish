import { useState } from "react";
import ReadBanner from "../components/Read/ReadBanner";
import ReadPanel from "../components/Read/ReadPanel";
import { ReadPageContextProvider, useReadPageContext } from "../context/ReadPageContext";

const Read = () => {

  return (
    <ReadPageContextProvider>
       <>
          <ReadBanner />
          <ReadPanel />
        </>
    </ReadPageContextProvider>
  );
};

export default Read;
