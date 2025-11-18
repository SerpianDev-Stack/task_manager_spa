import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
import { Main } from "../components/main";
import { TodoHeader } from "../components/todo-header";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Main>
        <TodoHeader />

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Main>


      
    </BrowserRouter>
  );
};
