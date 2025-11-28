import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/themeContext";
import type { ThemeContextType } from "../../contexts/themeContext";
import { useLogin } from "../../hooks/useLogin";
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
  FooterLink
} from "./login-session.style";

export const LoginSession = () => {
  const { theme } = useContext<ThemeContextType>(ThemeContext);
  const { setEmail, setPassword, error, handleLogin } = useLogin();
  
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
