import { tasksService } from "../taskService";

describe("tasksService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createTask deve chamar fetch corretamente e retornar o JSON", async () => {
    const fakeResponse = { id: 1, title: "Nova tarefa" };

    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => fakeResponse,
    });

    const result = await tasksService.createTask(10, "Nova tarefa");

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/tasks/10",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_name: "Nova tarefa" }),
      }
    );

    expect(result).toEqual(fakeResponse);
  });

  test("deleteTask deve chamar fetch corretamente e retornar o JSON", async () => {
    const fakeResponse = { success: true };

    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => fakeResponse,
    });

    const result = await tasksService.deleteTask(99);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/tasks/99",
      { method: "DELETE" }
    );

    expect(result).toEqual(fakeResponse);
  });

  test("toggleTask deve chamar fetch corretamente e retornar o JSON", async () => {
    const fakeResponse = { id: 5, completed: true };

    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => fakeResponse,
    });

    const result = await tasksService.toggleTask(5, true);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/tasks/5",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: true }),
      }
    );

    expect(result).toEqual(fakeResponse);
  });
});
