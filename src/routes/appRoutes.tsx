import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
import { Main } from "../components/main";
import { TodoHeader } from "../components/todo-header";
import { TodoPage } from "../pages/todo";
import { UserProvider } from "../contexts/userProvider";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Main>
          <TodoHeader />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/todo" element={<TodoPage />} />
          </Routes>
        </Main>
      </UserProvider>
    </BrowserRouter>
  );
};
