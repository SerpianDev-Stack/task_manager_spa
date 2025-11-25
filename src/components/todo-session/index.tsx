import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import type { ThemeContextType } from "../../contexts/themeContext";
import { Link } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";

import {
  Container,
  HeaderContainer,
  UserName,
  Form,
  InputGroup,
  Input,
  Label,
  Button,
  Return,
  TodoList,
  TaskContainer,
  DeleteButton,
  ToggleButton,
  TaskContent,
  ControlsContainer,
  Controllers
} from "./todo-session.style";

export const TodoSession = () => {
  const { theme } = useContext<ThemeContextType>(ThemeContext);
  const {
    user,
    handleSubmit,
    taskName,
    setTaskName,
    filteredTasks,
    deleteTask,
    toggleTaskState,
    setFilter,
    setUser
  } = useTasks();

  return (
    <>
      <Container $theme={theme}>
        <HeaderContainer>
          <UserName $theme={theme}>{user?.user_name || "Usuário"}</UserName>
        </HeaderContainer>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label $theme={theme} htmlFor="newTask">
              New Task:
            </Label>
            <Input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              $theme={theme}
              id="newTask"
              placeholder="Insert a new task"
            />
          </InputGroup>

          <Button type="submit" $theme={theme}>
            Add New Task
          </Button>
        </Form>

        <TodoList $theme={theme}>
          {filteredTasks.length ? (
            filteredTasks.map((task) => (
              <TaskContainer $theme={theme} key={task.id}>
                <TaskContent $completed={task.state} $theme={theme}>
                  {task.task_name}
                </TaskContent>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <ToggleButton
                    $completed={task.state}
                    onClick={() => toggleTaskState(task.id, task.state)}
                  >
                    {task.state ? "✔" : "○"}
                  </ToggleButton>

                  <DeleteButton onClick={() => deleteTask(task.id)}>
                    X
                  </DeleteButton>
                </div>
              </TaskContainer>
            ))
          ) : (
            <TaskContainer $theme={theme}>
              Nenhuma tarefa cadastrada
            </TaskContainer>
          )}
        </TodoList>

        <ControlsContainer $theme={theme}>
          <Controllers onClick={() => setFilter("completed")}>
            Show Completed
          </Controllers>
          <Controllers onClick={() => setFilter("pending")}>
            Show Pending
          </Controllers>
          <Controllers onClick={() => setFilter("all")}>
            Show All
          </Controllers>
          <Controllers
            onClick={() => setUser((prev) => ({ ...prev!, tasks: [] }))}
          >
            Clear List
          </Controllers>
          <Controllers
            onClick={() =>
              setUser((prev) => ({
                ...prev!,
                tasks: prev!.tasks.filter((task) => !task.state),
              }))
            }
          >
            Delete Completed
          </Controllers>
        </ControlsContainer>

        <Link to="/">
          <Return $theme={theme}>Voltar</Return>
        </Link>
      </Container>
    </>
  );
};
