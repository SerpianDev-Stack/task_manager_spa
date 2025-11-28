import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import type { UserContextType } from "../contexts/userContext";
import { authService } from "../services/authService";
import { isValidEmail } from "../utils/validators";
import { storageService } from "../services/storageService";

export const useLogin = () => {
  const { setUser } = useContext<UserContextType>(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Email inválido");
      return;
    }

    try {
      const data = await authService.login(email, password);
      setUser(data);

      storageService.saveUser(data);

      navigate("/todo");
    } catch (error) {
      console.log(error);
      setError("Erro ao conectar ao servidor");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};
