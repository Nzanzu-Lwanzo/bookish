import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main";
import Read from "./pages/Read";
import About from "./pages/About";
import Modal from "./components/CrossApp/Modal";
import { lsRead } from "./utils/localStorage-io";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { XIcon } from "./assets/svg";

function App() {
  const hasReadAboutPage = lsRead("bookish-has-read-about-page");

  return (
    <SnackbarProvider
      maxSnack={3}
      action={(snackBarId) => {
        return (
          <button
            type="button"
            className="hide-toast-message"
            onClick={() => closeSnackbar(snackBarId)}
          >
            <XIcon />
          </button>
        );

      }}
      className="toast-message"
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={hasReadAboutPage ? <Main /> : <Navigate to="/about" />}
            caseSensitive={false}
          />
          <Route path="/about" element={<About />} caseSensitive={false} />
          <Route
            path="/read-book/:id"
            element={hasReadAboutPage ? <Read /> : <Navigate to="/about" />}
            caseSensitive={false}
          />
        </Routes>
        <Modal />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
