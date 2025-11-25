import styled from "styled-components";

import type { ThemeName } from "../../contexts/themeProvider";
import { ThemeConfig } from "../../contexts/themeConfig";

export const Container = styled.div<{ $theme: ThemeName }>`
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

export const Warning = styled.span`
  font-size: 0.8rem;
  color: red;
  text-transform: uppercase;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #9ca3af;
`;

export const HeaderTitle = styled.h2<{ $theme: ThemeName }>`
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  font-size: 2rem;
`;

export const Form = styled.form`
  margin-top: 3rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 4rem;
`;

export const Label = styled.label<{ $theme: ThemeName }>`
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  font-size: 1.5rem;
  min-width: fit-content;
`;

export const Input = styled.input<{ $theme: ThemeName }>`
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

export const SubmitButton = styled.button`
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

export const FooterLink = styled.p<{ $theme: ThemeName }>`
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
