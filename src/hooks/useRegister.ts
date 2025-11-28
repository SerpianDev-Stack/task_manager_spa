import { useState } from "react";
import { isValidEmail } from "../utils/validators";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [warning, setWarning] = useState("");
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setWarning("preencha todos os campos");
      return;
    }

    if (!isValidEmail(email)) {
          setWarning("Email inválido");
          return;
        }

    setWarning("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setWarning(data.message || "Erro ao cadastrar");
        return;
      }

      console.log("Usuário criado com sucesso!");

      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.error("Erro ao conectar:", error);
      setWarning("Erro ao conectar com o servidor");
    }
  };

  return{
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    warning,
    setWarning,
    handleSubmit
  }
};
