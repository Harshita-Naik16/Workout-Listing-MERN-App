import React, { useEffect, useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div>
      <h3>Signup Form</h3>
      <form className="signup" onSubmit={handleSubmit}>
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
        <button disabled={isLoading}>Sign Up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
