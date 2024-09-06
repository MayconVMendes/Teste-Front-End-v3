import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterUser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Salvar os dados no localStorage
      const userData = { email, name, password };
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Cadastro realizado com sucesso!");

      navigate("/");
    } catch (err) {
      setError(err, "Login falhou, por favor tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerRegister">
      <h1 className="title">Cadastrar</h1>
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
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading} className="button">
          {loading ? "Loading..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default RegisterUser;
