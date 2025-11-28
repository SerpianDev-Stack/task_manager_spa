import styled from "styled-components";
import type { ThemeName } from "../../contexts/themeProvider";
import { ThemeConfig } from "../../contexts/themeConfig";

export const UserName = styled.h2<{ $theme: ThemeName }>`
  font-size: 2rem;
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #9ca3af;
`;

export const Container = styled.div<{ $theme: ThemeName }>`
  width: 90%;
  box-sizing: border-box;
  margin: auto;
  min-height: 32rem;
  height: auto;
  background-color: ${({ $theme }) => ThemeConfig[$theme].todo.backgroundColor};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  padding: 1rem;
`;

export const TaskContainer = styled.li<{ $theme: ThemeName }>`
  padding: 1rem;
  background-color: ${({ $theme }) => ThemeConfig[$theme].todo.inputColor};
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
`;

export const TodoList = styled.ul<{ $theme: ThemeName }>`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Form = styled.form`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

export const Label = styled.label<{ $theme: ThemeName }>`
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  font-size: 1rem;
  min-width: fit-content;
`;

export const Input = styled.input<{ $theme: ThemeName }>`
  background-color: ${({ $theme }) => ThemeConfig[$theme].todo.inputColor};
  padding: 1rem;
  width: 100%;
  border-radius: 1rem;
  color: hsl(0, 0%, 100%);
  border: none;

  &::placeholder {
    color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const Button = styled.button<{ $theme: ThemeName }>`
  background-color: hsl(220, 80%, 60%);
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.2s ease;
  min-width: 8rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    opacity: 0.85;
  }
`;

export const Return = styled.p<{ $theme: ThemeName }>`
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  padding-top: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  width: fit-content;
  position: relative;

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

export const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;

  background-color: transparent;
  border: 1px solid red;
  color: red;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;

  transition: 0.2s ease;

  &:hover {
    background-color: red;
    color: white;
  }
`;

export const ToggleButton = styled.button<{ $completed: boolean }>`
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 600;

  background-color: ${({ $completed }) =>
    $completed ? "hsl(140, 60%, 40%)" : "hsl(220, 20%, 50%)"};
  color: white;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const TaskContent = styled.span<{ $completed: boolean; $theme: ThemeName }>`
  color: ${({ $completed, $theme }) =>
    $completed
      ? ThemeConfig[$theme].todo.textColor + "AA"
      : ThemeConfig[$theme].todo.textColor};

  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};

  opacity: ${({ $completed }) => ($completed ? 0.6 : 1)};
  font-style: ${({ $completed }) => ($completed ? "italic" : "normal")};
  transition: 0.25s ease;
`;

export const ControlsContainer = styled.div<{ $theme: ThemeName }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  border-bottom: 1px solid
    ${({ $theme }) => ThemeConfig[$theme].todo.borderColor};
`;

export const Controllers = styled.p`
  cursor: pointer;

  &:hover {
    color: hsl(220, 80%, 60%);
  }
`;
