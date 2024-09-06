import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

function HomePage() {
  const { user, saveUser } = useContext(UserContext);

  // Verificar se há um usuário no localStorage
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    // Se houver dados de usuário no localStorage, faça o login
    if (storedUserData && !user) {
      saveUser(storedUserData);
    }
  }, [user, saveUser]);

  return (
    <div className="home">
      <h2>Seja bem vindo, ao Teste Front End v3</h2>
      <p>Por favor, qualquer duvida entrar em contato.</p>
    </div>
  );
}

export default HomePage;
