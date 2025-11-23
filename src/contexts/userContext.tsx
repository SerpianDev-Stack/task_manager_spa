import { createContext } from "react";

export type User = {
  id: number;
  user_name: string;
  email: string;
  tasks: {
    id: number;
    task_name: string;
    state: boolean;
  }[];
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
