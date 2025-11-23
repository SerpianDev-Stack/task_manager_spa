import type { ReactNode } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import type { ThemeName } from "../../contexts/themeProvider";
import { ThemeConfig } from "../../contexts/themeConfig";
import styled from "styled-components";

interface MainProps {
  children: ReactNode;
}

const MainContainer = styled.main<{ $theme: ThemeName }>`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  /* fundo sólido */
  background-color: ${({ $theme }) =>
    ThemeConfig[$theme].layout.backgroundColor};

  /* imagem no topo do fundo */
  background-image: url("/images/bg-desktop-dark.jpg");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 20rem; /* mesmo tamanho que você queria */
`;

export const Main = ({ children }: MainProps) => {
  const { theme } = useContext(ThemeContext);
  return <MainContainer $theme={theme}>{children}</MainContainer>;
};
