import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// ----------------------------------------------------
// COMPONENTES ESTILIZADOS
// ----------------------------------------------------

// 1. CONTAINER PRINCIPAL (div)
const Container = styled.div`
  max-width: 90%;
  margin: auto;
  height: 27rem;
  background-color: hsl(
    235,
    24%,
    19%
  ); /* bg-neutral-very-dark-desaturated-blue */
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

// 2. HEADER CONTAINER (div)
const HeaderContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #9ca3af; /* border-b-gray-400 */
`;

const HeaderTitle = styled.h2`
  color: hsl(0, 0%, 100%); /* text-white */
  font-size: 2rem;
`;

const Form = styled.form`
  margin-top: 3rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* gap-2 */
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 4rem;
`;

const Label = styled.label`
  color: hsl(0, 0%, 100%); /* text-white */
  font-size: 1.5rem;
  min-width: fit-content;
`;

const Input = styled.input`
  background-color: hsl(235, 21%, 11%); /* bg-neutral-very-dark-blue */
  padding: 1rem;
  width: 100%;
  border-radius: 1rem; /* rounded-2xl */
  color: hsl(0, 0%, 100%); /* text-white */
  border: none;

  &::placeholder {
    color: hsl(236, 9%, 61%); /* placeholder-neutral-dark-grayish-blue */
  }

  &:focus {
    outline: none; /* focus:outline-none */
    box-shadow: none; /* focus:ring-0 */
  }
`;

// 8. BUTTON (SubmitButton)
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

// 9. FOOTER LINK (div)
const FooterLink = styled.div`
  color: hsl(236, 9%, 61%);
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

// ----------------------------------------------------
// COMPONENTE PRINCIPAL (LoginSession)
// ----------------------------------------------------
export const LoginSession = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setWarning("preencha todos os campos");
      return;
    }

    if (!emailRegex.test(email)) {
      setWarning("email inválido");
      return;
    }

    setWarning("");
    console.log("Form enviado:", { email, password });
  };
  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Iniciar sessão</HeaderTitle>
      </HeaderContainer>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Digite seu email"
            id="email"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Digite sua senha"
            id="password"
          />
        </InputGroup>
        {warning && <Warning>{warning}</Warning>}
        <SubmitButton type="submit">Entrar</SubmitButton>
      </Form>

      <Link to="/register"><FooterLink>Cadastre-se</FooterLink></Link>
    </Container>
  );
};
