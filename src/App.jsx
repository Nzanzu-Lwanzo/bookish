import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main";
import Read from "./pages/Read";
import { AppContextProvider } from "./context/AppContext";
import Modal from "./components/CrossApp/Modal";

function App() {

  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} caseSensitive={false} />
          <Route
            path="/read-book/:id"
            element={<Read />}
            caseSensitive={false}
          />
        </Routes>
        <Modal />
      </Router>
    </AppContextProvider>
  );
}

export default App;
