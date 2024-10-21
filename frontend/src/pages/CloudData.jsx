import React from "react";
import { enqueueSnackbar } from "notistack";
import Books from "../components/Cloud/Books";
import { Search, House, List, Book } from "lucide-react";
import { Link } from "react-router-dom";
import CloudBanner from "../components/Cloud/CloudBanner";

const CloudData = () => {
  return (
    <main className="cloud-data">
      <CloudBanner></CloudBanner>
      <div className="menu">
        <button
          type="button"
          className="search action-icon center"
          onClick={() => enqueueSnackbar("Fonctionnalité bientôt disponible !")}
        >
          <Search size={18} stroke="#000" />
        </button>

        <button
          type="button"
          className="switch-section action-icon center"
          onClick={() => enqueueSnackbar("Fonctionnalité bientôt disponible !")}
        >
          <List size={18} stroke="#000" />
        </button>
        <Link to="/" className="center">
          <House size={18} stroke="#000"></House>
        </Link>
      </div>

      <Books></Books>
    </main>
  );
};

export default CloudData;
