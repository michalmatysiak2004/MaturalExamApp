import { useState, useContext } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import { AuthContext } from "./AuthContext"; // ✅ import kontekstu
import { Link } from "react-router-dom";
function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ użycie login() z kontekstu

  const [name, messege, isLoggingin] =
    method === "login"
      ? ["Login", "Nie masz jeszcze konta? ", true]
      : ["Register", "Masz już konto?", false];

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { email, username, password });
      if (method === "login") {
        // ✅ użycie kontekstowego login()
        login(res.data.access); // zapisuje do localStorage i ustawia isLoggedIn = true
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(error.response.data.detail); // JWT zazwyczaj zwraca {"detail": "..."}
      } else {
        alert("Wystąpił błąd logowania");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      {!isLoggingin ? (
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      ) : null}
      <input
        className="form-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {name}
      </button>
      <a> {messege} </a>
      {isLoggingin ? (
        <Link to="/register">Zarejstruj się</Link>
      ) : (
        <Link to="/login">Zaloguj się </Link>
      )}
    </form>
  );
}

export default Form;
