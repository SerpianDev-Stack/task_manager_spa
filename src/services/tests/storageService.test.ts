import { storageService } from "../storageService";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("storageService", () => {
  test("saveUser deve salvar o usuário no localStorage", () => {
    const fakeUser = {
      id: 1,
      user_name: "Pedro",
      email: "pedro@email.com",
      tasks: []
    };

    storageService.saveUser(fakeUser);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify(fakeUser)
    );
  });

  test("getUser deve retornar o usuário salvo", () => {
    const fakeUser = {
      id: 2,
      user_name: "Ana",
      email: "ana@email.com",
      tasks: []
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));

    const result = storageService.getUser();

    expect(result).toEqual(fakeUser);
  });

  test("getUser deve retornar null quando não tem usuário", () => {
    localStorage.removeItem("user");

    const result = storageService.getUser();

    expect(result).toBeNull();
  });

  test("clearUser deve remover o usuário do localStorage", () => {
    localStorage.setItem("user", "qualquer coisa");

    storageService.clearUser();

    expect(localStorage.removeItem).toHaveBeenCalledWith("user");
  });
});
