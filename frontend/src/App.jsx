import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Read from "./pages/Read";
import About from "./pages/About";
import Modal from "./components/CrossApp/Modal";
import CreateBookForm from "./pages/CreateBookForm";
import UpdateBookForm from "./pages/UpdateBookForm";
import AuthForm from "./pages/AuthForm";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { XIcon } from "./assets/svg";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import CloudData from "./pages/CloudData";
import ReadCloud from "./pages/ReadCloud";


const client = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 1,
      retryDelay: 3000,
    },
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={client}>
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
            <Route path="/auth" element={<AuthForm />} caseSensitive={false} />
            <Route
              path="/cloud"
              element={<CloudData />}
              caseSensitive={false}
            />
            <Route
              path="/cloud/:id"
              element={<ReadCloud />}
              caseSensitive={false}
            />
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
    </QueryClientProvider>
  );
}

export default App;
