import { renderHook, act } from "@testing-library/react";
import { useLogin } from "../useLogin";
import { UserContext } from "../../contexts/userContext";
import type { User } from "../../contexts/userContext";
import type { ReactNode } from "react";

import { authService } from "../../services/authService";
import { storageService } from "../../services/storageService";
import { useNavigate } from "react-router-dom";

jest.mock("../../services/authService");
jest.mock("../../services/storageService");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn()
}));

describe("useLogin", () => {
  const mockSetUser = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>
      {children}
    </UserContext.Provider>
  );

  test("deve realizar login com sucesso", async () => {
    const fakeUser: User = {
      id: 1,
      user_name: "Pedro",
      email: "pedro@email.com",
      created_in: "2025",
      tasks: []
    };

    (authService.login as jest.Mock).mockResolvedValue(fakeUser);

    const { result } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.setEmail("pedro@email.com");
      result.current.setPassword("12345");
    });

    const fakeEvent = { preventDefault: () => {} } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleLogin(fakeEvent);
    });

    expect(authService.login).toHaveBeenCalledWith(
      "pedro@email.com",
      "12345"
    );

    expect(mockSetUser).toHaveBeenCalledWith(fakeUser);
    expect(storageService.saveUser).toHaveBeenCalledWith(fakeUser);
    expect(mockNavigate).toHaveBeenCalledWith("/todo");
  });

  test("deve exibir erro quando email é inválido", async () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.setEmail("email-invalido");
      result.current.setPassword("12345");
    });

    const fakeEvent = { preventDefault: () => {} } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleLogin(fakeEvent);
    });

    expect(result.current.error).toBe("Email inválido");
    expect(authService.login).not.toHaveBeenCalled();
  });

  test("deve mostrar erro quando o login falha", async () => {
    (authService.login as jest.Mock).mockRejectedValue(
      new Error("Network error")
    );

    const { result } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.setEmail("pedro@email.com");
      result.current.setPassword("12345");
    });

    const fakeEvent = { preventDefault: () => {} } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleLogin(fakeEvent);
    });

    expect(result.current.error).toBe("Erro ao conectar ao servidor");
  });
});
