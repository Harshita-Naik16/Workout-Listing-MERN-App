import React, { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div>
      <h3>Login Form</h3>
      <form className="login" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button disabled={isLoading}>Log In</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
