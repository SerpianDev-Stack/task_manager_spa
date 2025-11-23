import { ThemeConfig } from "../../contexts/themeConfig";
import { ThemeContext } from "../../contexts/themeContext";
import { useContext } from "react";
import styled from "styled-components";
import type { ThemeContextType } from "../../contexts/themeContext";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  margin-bottom: 1.5rem; /* mb-6 */
  padding-top: 5rem; /* pt-20 */
`;

const Title = styled.h1`
  font-size: 2.5rem; /* text-[2.5rem] */
  font-weight: bold;
  letter-spacing: 1rem; /* tracking-[1rem] */
  color: #fff;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const IconImg = styled.img`
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const TodoHeader = () => {
  const { theme, toggleTheme } = useContext<ThemeContextType>(ThemeContext);

  console.log(ThemeConfig[theme]);
  return (
    <HeaderContainer>
      <Title>TASK LIST</Title>

      <IconButton onClick={toggleTheme}>
        <IconImg
          src={`${ThemeConfig[theme].Icon}`}
          alt="Ícone de sol que altera o tema"
        />
      </IconButton>
    </HeaderContainer>
  );
};
