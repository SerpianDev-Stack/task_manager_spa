import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import type { ThemeContextType } from "../../contexts/themeContext";
import type { ThemeName } from "../../contexts/themeProvider";
import { ThemeConfig } from "../../contexts/themeConfig";
import { UserContext } from "../../contexts/userContext";
import { useState } from "react";
import type { UserContextType } from "../../contexts/userContext";
import { Link } from "react-router-dom";

const UserName = styled.h2<{ $theme: ThemeName }>`
  font-size: 2rem;
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
`;
const HeaderContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #9ca3af; /* border-b-gray-400 */
`;

const Container = styled.div<{ $theme: ThemeName }>`
  width: 90%;
  box-sizing: border-box;
  margin: auto;
  min-height: 32rem; /* COMEÇA com 32rem mas cresce se precisar */
  height: auto; /* permite crescer */
  background-color: ${({ $theme }) => ThemeConfig[$theme].todo.backgroundColor};
  border-radius: 1rem; /* rounded-2xl */
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4); /* shadow-2xl */
  padding: 1rem;
`;

const TaskContainer = styled.li<{ $theme: ThemeName }>`
  padding: 1rem;
  background-color: ${({ $theme }) => ThemeConfig[$theme].todo.inputColor};
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between; /* separa texto e botão */
  align-items: center;
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
`;

const TodoList = styled.ul<{ $theme: ThemeName }>`
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Form = styled.form`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  /* deixa tudo alinhado e mais proporcional */
  padding: 1rem;
  border-radius: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: auto;
  width: 100%;

 
}
`;

const Label = styled.label<{ $theme: ThemeName }>`
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  font-size: 1rem;
  min-width: fit-content;
`;

const Input = styled.input<{ $theme: ThemeName }>`
  background-color: ${({ $theme }) => ThemeConfig[$theme].todo.inputColor};
  padding: 1rem;
  width: 100%;
  border-radius: 1rem; /* rounded-2xl */
  color: hsl(0, 0%, 100%); /* text-white */
  border: none;

   &::placeholder {
  color: ${({ $theme }) => ThemeConfig[$theme].todo.textColor};
  opacity: 0.7; /* opcional, só pra ficar mais suave */
`;

const Button = styled.button<{ $theme: ThemeName }>`
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
const Return = styled.p<{ $theme: ThemeName }>`
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

const DeleteButton = styled.button`
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
export const TodoSession = () => {
  const { theme } = useContext<ThemeContextType>(ThemeContext);
  const { user, setUser } = useContext<UserContextType>(UserContext);
  const [taskName, setTaskName] = useState("");

  console.log("USER CONTEXT →", user);

  async function deleteTask(taskId: number) {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log(data);

      // remove do estado
      setUser((prev) => ({
        ...prev!,
        tasks: prev!.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async function createTask(taskName: string) {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:3000/tasks/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task_name: taskName }),
      });

      const data = await response.json();
      console.log(data);

      setUser((prev) => ({
        ...prev!,
        tasks: [...(prev?.tasks || []), data.task],
      }));

      setTaskName("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createTask(taskName);
  }

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
          {user?.tasks?.length ? (
            user.tasks.map((task) => (
              <TaskContainer $theme={theme} key={task.id}>
                {task.task_name}
                <DeleteButton onClick={() => deleteTask(task.id)}>
                  X
                </DeleteButton>
              </TaskContainer>
            ))
          ) : (
            <TaskContainer $theme={theme}>
              Nenhuma tarefa cadastrada
            </TaskContainer>
          )}
        </TodoList>
        <Link to="/">
          <Return $theme={theme}>Voltar</Return>
        </Link>
      </Container>
    </>
  );
};
