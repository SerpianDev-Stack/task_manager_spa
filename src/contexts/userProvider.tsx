import { useState } from "react";
import { UserContext } from "./userContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
