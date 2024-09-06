import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import Header from "./components/Header";
import RegisterUser from "./pages/RegisterUser";
import Enterprise from "./pages/Enterprise";
import Partner from "./pages/Partner";
import About from "./pages/About";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Header />
          <ToastContainer autoClose={3000} pauseOnHover={false} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastrar-usuario" element={<RegisterUser />} />
              <Route path="/empresa/:page" element={<Enterprise />} />
              <Route path="/parceiro/:page" element={<Partner />} />
              <Route path="/sobre" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
