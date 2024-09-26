import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from "./pages/Main";
import Read from "./pages/Read";
import About from "./pages/About";
import Modal from "./components/CrossApp/Modal";
import CreateBookForm from "./pages/CreateBookForm";
import UpdateBookForm from "./pages/UpdateBookForm";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { XIcon } from "./assets/svg";

function App() {

  return (
    <SnackbarProvider
      maxSnack={4}
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
          <Route path="/" element={<Main />} caseSensitive={false} />
          <Route path="/about" element={<About />} caseSensitive={false} />
          <Route
            path="/create-book"
            element={<CreateBookForm />}
            caseSensitive={false}
          />
          <Route
            path="/update-book/:id"
            element={<UpdateBookForm />}
            caseSensitive={false}
          />
          <Route
            path="/read-book/:id"
            element={<Read />}
            caseSensitive={false}
          />
          <Route path="*" element={<Main />} caseSensitive={false} />
        </Routes>
        <Modal />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
