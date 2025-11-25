import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import type { ThemeContextType } from "../../contexts/themeContext";
import { useRegister } from "../../hooks/useRegister";

import {
  Container,
  Warning,
  HeaderContainer,
  HeaderTitle,
  Form,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  Return
} from "./register.style";

export const Register = () => {
  const { theme } = useContext<ThemeContextType>(ThemeContext);
  const { email, setEmail, warning, password, setPassword, handleSubmit, setName, name } = useRegister();

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
