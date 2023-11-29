import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("login response", response);

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setLoading(false);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setLoading(false);
    }
  };

  return { login, error, isLoading };
};
