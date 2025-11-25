import type { User } from "../contexts/userContext";

export const storageService = {
  saveUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser(): User | null {
    const data = localStorage.getItem("user");
    return data ? (JSON.parse(data) as User) : null;
  },

  clearUser() {
    localStorage.removeItem("user");
  }
};