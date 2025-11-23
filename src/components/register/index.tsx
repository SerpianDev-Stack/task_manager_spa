import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import type { ThemeContextType } from "../../contexts/themeContext";
import type { ThemeName } from "../../contexts/themeProvider";
import { ThemeConfig } from "../../contexts/themeConfig";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Container = styled.div<{ $theme: ThemeName }>`
  width: 90%;
  margin: auto;
  height: 32rem;
  background-color: ${({ $theme }) => ThemeConfig[$theme].todo.backgroundColor};
  border-radius: 1rem; /* rounded-2xl */
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4); /* shadow-2xl */
`;

const Warning = styled.span`
  font-size: 0.8rem;
  color: red;
  text-transform: uppercase;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #9ca3af; /* border-b-gray-400 */
`;

const HeaderTitle = styled.h2<{ $theme: ThemeName }>`
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  font-size: 2rem;
`;

const Form = styled.form`
  margin-top: 3rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* gap-2 */
`;

// 5. INPUT GROUP (div)
const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 4rem;
`;

const Label = styled.label<{ $theme: ThemeName }>`
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  font-size: 1.5rem;
  min-width: fit-content;
`;

const Input = styled.input<{ $theme: ThemeName }>`
  background-color: ${({ $theme }) => ThemeConfig[$theme].todo.inputColor};
  padding: 1rem;
  width: 100%;
  border-radius: 1rem; /* rounded-2xl */
  color: hsl(0, 0%, 100%); /* text-white */
  border: none;

  &::placeholder {
    color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  }

  &:focus {
    outline: none; /* focus:outline-none */
    box-shadow: none; /* focus:ring-0 */
  }
`;

const SubmitButton = styled.button`
  margin-top: 1.5rem; /* mt-6 */
  width: 100%;
  background-color: #facc15; /* bg-amber-400 */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6); /* shadow-2xl mais forte */
  color: hsl(235, 24%, 19%); /* text-neutral-very-dark-desaturated-blue */
  font-weight: 600; /* font-semibold */
  padding: 0.75rem 0; /* py-3 */
  border-radius: 0.75rem; /* rounded-xl */
  border: none;
  cursor: pointer;

  transition: all 0.3s ease; /* transition duration-300 */

  &:hover {
    background-color: #fcd34d; /* hover:bg-amber-300 */
  }

  &:active {
    transform: scale(0.95); /* active:scale-95 */
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.4);
  }
`;

const Return = styled.p<{ $theme: ThemeName }>`
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  padding-top: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;

  position: relative;
  width: fit-content;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 0%;
    height: 2px;
    background-color: hsl(0, 0%, 100%);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &:hover {
    color: hsl(0, 0%, 100%);
  }

  &:hover::after {
    width: 100%;
  }
`;
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [warning, setWarning] = useState("");
  const { theme } = useContext<ThemeContextType>(ThemeContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setWarning("preencha todos os campos");
      return;
    }

    if (!emailRegex.test(email)) {
      setWarning("email inválido");
      return;
    }

    setWarning("");

    try {
      const response = await fetch("http://localhost:3000/register", {
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

      // se a API respondeu erro (ex: email já cadastrado)
      if (!response.ok) {
        setWarning(data.message || "Erro ao cadastrar");
        return;
      }

      // sucesso!
      console.log("Usuário criado com sucesso!");

      // se quiser, redirecionar depois de cadastrar:
      // navigate("/login")

      // limpar inputs
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.error("Erro ao conectar:", error);
      setWarning("Erro ao conectar com o servidor");
    }
  };

  return (
    <Container $theme={theme}>
      <HeaderContainer>
        <HeaderTitle $theme={theme}>Cadastre-se</HeaderTitle>
      </HeaderContainer>

      <Form onSubmit={handleSubmit} noValidate>
        <InputGroup>
          <Label $theme={theme} htmlFor="email">
            Email:
          </Label>
          <Input
            $theme={theme}
            type="email"
            placeholder="Digite seu email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label $theme={theme} htmlFor="password">
            Senha:
          </Label>
          <Input
            $theme={theme}
            type="password"
            placeholder="Digite sua senha"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label $theme={theme} htmlFor="name">
            Nome:
          </Label>
          <Input
            $theme={theme}
            type="text"
            placeholder="Nome completo"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>

        {warning && <Warning>{warning}</Warning>}

        <SubmitButton type="submit">Cadastrar-se</SubmitButton>
      </Form>
      <Link to="/">
        <Return $theme={theme}>Voltar</Return>
      </Link>
    </Container>
  );
};
