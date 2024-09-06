import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Novo estado para o checkbox
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Obter os dados do usuário armazenados no localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
      if (
        email === storedUserData.email &&
        password === storedUserData.password
      ) {
        // Armazenar dados do usuário dependendo da opção "manter logado"
        if (rememberMe) {
          localStorage.setItem("userData", JSON.stringify(storedUserData));
        } else {
          sessionStorage.setItem("userData", JSON.stringify(storedUserData));
        }

        // Redirecionar para a página inicial após o login
        navigate("/");
        toast.success("Login realizado com sucesso");
      } else {
        setError("Email ou senha inválidos.");
        toast.error("Email ou senha inválidos");
        setLoading(false);
      }
    } else {
      setError(
        <>
          Nenhum usuário encontrado. Por favor,{" "}
          <Link to="/cadastrar-usuario">
            <strong>cadastre-se</strong>
          </Link>
        </>
      );
      setLoading(false);
    }
  };

  return (
    <div className="containerLogin">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="formGroup check">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Manter logado</label>
        </div>
        {error && <p className={error}>{error}</p>}
        <button type="submit" disabled={loading} className="button">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
