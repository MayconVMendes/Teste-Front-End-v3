import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");

  //Função para deslogar
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      function fetchAndSetFirstName() {
        const nameParts = user.name.split(" ");
        setFirstName(nameParts[0]);
      }

      fetchAndSetFirstName();
    } else {
      return;
    }
  }, [user]);

  return (
    <header>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/empresa/1">Empresa</Link>
              </li>
              <li>
                <Link to="/parceiro/1">Parceiro</Link>
              </li>
              <li>
                <Link to="/sobre">Sobre</Link>
              </li>
              <li>
                <Link onClick={handleLogout} to="/">
                  Sair
                </Link>
              </li>
              <li>
                <p className="userName">Bem-vindo, {firstName}</p>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/login">Logar</Link>
              </li>
              <li>
                <Link to="/cadastrar-usuario">Cadastre-se</Link>
              </li>
              <li>
                <Link to="/sobre">Sobre</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
