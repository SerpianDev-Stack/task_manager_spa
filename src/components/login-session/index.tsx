import styled from "styled-components";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/themeContext";
import type { ThemeContextType } from "../../contexts/themeContext";
import type { ThemeName } from "../../contexts/themeProvider";
import { ThemeConfig } from "../../contexts/themeConfig";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ----------------------------------------------------
// COMPONENTES ESTILIZADOS COM TEMA
// ----------------------------------------------------

const Container = styled.div<{ $theme: ThemeName }>`
  width: 90%;
  margin: auto;
  height: 27rem;

  background-color: ${({ $theme }) => ThemeConfig[$theme].todo.backgroundColor};

  border-radius: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
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
  border-bottom: 1px solid #9ca3af;
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
  gap: 0.5rem;
`;

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
  border-radius: 1rem;
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  border: none;

  &::placeholder {
    color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const SubmitButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  background-color: #facc15;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
  color: hsl(235, 24%, 19%);
  font-weight: 600;
  padding: 0.75rem 0;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background-color: #fcd34d;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.4);
  }
`;

const FooterLink = styled.p<{ $theme: ThemeName }>`
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
    background-color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ $theme }) => ThemeConfig[$theme].layout.textColor};
  }

  &:hover::after {
    width: 100%;
  }
`;

// ----------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------

export const LoginSession = () => {
  const { theme } = useContext<ThemeContextType>(ThemeContext);
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Email inválido");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao fazer login");
        return;
      }

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/todo");
    } catch (error) {
      console.log(error);
      setError("Erro ao conectar ao servidor");
    }
  };

  return (
    <Container $theme={theme}>
      <HeaderContainer>
        <HeaderTitle $theme={theme}>Iniciar sessão</HeaderTitle>
      </HeaderContainer>

      <Form onSubmit={handleLogin}>
        <InputGroup>
          <Label $theme={theme} htmlFor="email">
            Email:
          </Label>
          <Input
            $theme={theme}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Digite seu email"
            id="email"
          />
        </InputGroup>

        <InputGroup>
          <Label $theme={theme} htmlFor="password">
            Senha:
          </Label>
          <Input
            $theme={theme}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Digite sua senha"
            id="password"
          />
        </InputGroup>

        {error && <Warning>{error}</Warning>}

        <SubmitButton type="submit">Entrar</SubmitButton>
      </Form>

      <Link to="/register">
        <FooterLink $theme={theme}>Cadastre-se</FooterLink>
      </Link>
    </Container>
  );
};
