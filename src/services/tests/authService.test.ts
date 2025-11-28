import { beforeEach } from "node:test";

import { authService } from "../authService";

describe("authService.login", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        token: "123",
        user: { id: 1, email: "test@test.com" },
      }),
    });
  });

  it("deve chamar fetch com os dados corretos e retornar o body quando a API retorna sucesso", async () => {
    const fakeResponse = {
      user: { id: 1, name: "Pedro" },
      token: "abc123",
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => fakeResponse,
    });

    const result = await authService.login("email@test.com", "1234");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "email@test.com",
        password: "1234",
      }),
    });

    expect(result).toEqual(fakeResponse);
  });

  it("deve lançar erro com a mensagem retornada pela API quando response.ok for false", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: "Credenciais inválidas" }),
    });

    await expect(authService.login("email@test.com", "1234")).rejects.toThrow(
      "Credenciais inválidas"
    );
  });

  it("deve lançar erro genérico quando a API retorna erro sem message", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}), // body vazio
    });

    await expect(authService.login("email@test.com", "1234")).rejects.toThrow(
      "Erro ao fazer login"
    );
  });

  it("deve propagar erro quando fetch itself rejeita (ex: network error)", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network fail"));

    await expect(authService.login("email@test.com", "1234")).rejects.toThrow(
      "network fail"
    );
  });
});
