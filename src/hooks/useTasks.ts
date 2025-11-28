import { useState, useContext } from "react";
import { UserContext, type UserContextType } from "../contexts/userContext";
import { tasksService } from "../services/taskService";

export const useTasks = () => {

  const { user, setUser } = useContext<UserContextType>(UserContext);
  const [taskName, setTaskName] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  async function createTask(name: string) {
    if (!user) return;

    try {
      const data = await tasksService.createTask(user.id, name);

      setUser((prev) => ({
        ...prev!,
        tasks: [...prev!.tasks, data.task],
      }));

      setTaskName("");

    } catch (error) {
      console.log("Erro ao criar tarefa:", error);
    }
  }

  async function deleteTask(taskId: number) {
    if (!user) return;

    try {
      await tasksService.deleteTask(taskId);

      setUser((prev) => ({
        ...prev!,
        tasks: prev!.tasks.filter((task) => task.id !== taskId),
      }));

    } catch (error) {
      console.log("Erro ao deletar tarefa:", error);
    }
  }

  async function toggleTaskState(taskId: number, currentState: boolean) {
    if (!user) return;

    try {
      await tasksService.toggleTask(taskId, !currentState);

      setUser((prev) => ({
        ...prev!,
        tasks: prev!.tasks.map((task) =>
          task.id === taskId ? { ...task, state: !currentState } : task
        ),
      }));

    } catch (error) {
      console.log("Erro ao alternar estado:", error);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createTask(taskName);
  }

  const filteredTasks = (user?.tasks ?? []).filter((task) => {
    if (filter === "completed") return task.state;
    if (filter === "pending") return !task.state;
    return true;
  });

  return {
    user,
    setUser,
    taskName,
    setTaskName,
    handleSubmit,
    filter,
    setFilter,
    createTask,
    deleteTask,
    toggleTaskState,
    filteredTasks,
    clearTasks: () =>
      setUser((prev) => ({
        ...prev!,
        tasks: [],
      })),
    deleteCompleted: () =>
      setUser((prev) => ({
        ...prev!,
        tasks: prev!.tasks.filter((t) => !t.state),
      })),
  };
};
