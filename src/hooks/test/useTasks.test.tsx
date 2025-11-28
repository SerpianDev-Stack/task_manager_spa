import { renderHook, act } from "@testing-library/react";
import { useTasks } from "../useTasks";
import { UserContext, type User} from "../../contexts/userContext";
import { tasksService } from "../../services/taskService";

jest.mock("../../services/taskService");

const mockSetUser = jest.fn();

const createWrapper = (user: User | null) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UserContext.Provider value={{ user, setUser: mockSetUser }}>
      {children}
    </UserContext.Provider>
  );

  return wrapper;
};

const fakeUser: User = {
  id: 1,
  user_name: "Pedro",
  email: "pedro@email.com",
  created_in: "2025",
  tasks: [],
};

describe("useTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createTask deve adicionar uma nova tarefa ao usuário", async () => {
    const wrapper = createWrapper(fakeUser);

    const fakeTask = { id: 10, task_name: "Nova tarefa", state: false };

    (tasksService.createTask as jest.Mock).mockResolvedValue({
      task: fakeTask,
    });

    const { result } = renderHook(() => useTasks(), { wrapper });

    await act(async () => {
      await result.current.createTask("Nova tarefa");
    });

    expect(tasksService.createTask).toHaveBeenCalledWith(fakeUser.id, "Nova tarefa");

    expect(mockSetUser).toHaveBeenCalled();
    const callback = mockSetUser.mock.calls[0][0];

    const updatedUser = callback(fakeUser);
    expect(updatedUser.tasks).toContainEqual(fakeTask);
  });

  test("deleteTask deve remover a tarefa corretamente", async () => {
    const userWithTasks: User = {
      ...fakeUser,
      tasks: [
        { id: 1, task_name: "A", state: false },
        { id: 2, task_name: "B", state: true },
      ],
    };

    const wrapper = createWrapper(userWithTasks);

    (tasksService.deleteTask as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useTasks(), { wrapper });

    await act(async () => {
      await result.current.deleteTask(1);
    });

    expect(tasksService.deleteTask).toHaveBeenCalledWith(1);

    const callback = mockSetUser.mock.calls[0][0];
    const updatedUser = callback(userWithTasks);

    expect(updatedUser.tasks).toEqual([{ id: 2, task_name: "B", state: true }]);
  });

  test("toggleTaskState deve alternar o estado da tarefa", async () => {
    const userWithTasks: User = {
      ...fakeUser,
      tasks: [
        { id: 1, task_name: "A", state: false },
        { id: 2, task_name: "B", state: true },
      ],
    };

    const wrapper = createWrapper(userWithTasks);

    (tasksService.toggleTask as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useTasks(), { wrapper });

    await act(async () => {
      await result.current.toggleTaskState(1, false);
    });

    expect(tasksService.toggleTask).toHaveBeenCalledWith(1, true);

    const callback = mockSetUser.mock.calls[0][0];
    const updatedUser = callback(userWithTasks);

    expect(updatedUser.tasks[0].state).toBe(true);
  });

  test("filteredTasks deve filtrar tarefas corretamente", () => {
    const userWithTasks: User = {
      ...fakeUser,
      tasks: [
        { id: 1, task_name: "A", state: false },
        { id: 2, task_name: "B", state: true },
        { id: 3, task_name: "C", state: false },
      ],
    };

    const wrapper = createWrapper(userWithTasks);
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.setFilter("completed");
    });

    expect(result.current.filteredTasks).toEqual([
      { id: 2, task_name: "B", state: true },
    ]);

    act(() => {
      result.current.setFilter("pending");
    });

    expect(result.current.filteredTasks).toEqual([
      { id: 1, task_name: "A", state: false },
      { id: 3, task_name: "C", state: false },
    ]);
  });

  test("clearTasks deve limpar todas as tarefas", () => {
    const userWithTasks: User = {
      ...fakeUser,
      tasks: [{ id: 1, task_name: "A", state: false }],
    };

    const wrapper = createWrapper(userWithTasks);
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.clearTasks();
    });

    const callback = mockSetUser.mock.calls[0][0];
    const updatedUser = callback(userWithTasks);

    expect(updatedUser.tasks).toEqual([]);
  });

  test("deleteCompleted deve remover apenas tarefas completas", () => {
    const userWithTasks: User = {
      ...fakeUser,
      tasks: [
        { id: 1, task_name: "A", state: false },
        { id: 2, task_name: "B", state: true },
        { id: 3, task_name: "C", state: true },
      ],
    };

    const wrapper = createWrapper(userWithTasks);
    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.deleteCompleted();
    });

    const callback = mockSetUser.mock.calls[0][0];
    const updatedUser = callback(userWithTasks);

    expect(updatedUser.tasks).toEqual([{ id: 1, task_name: "A", state: false }]);
  });
});
