export const tasksService = {
  async createTask(userId: number, taskName: string) {
    const res = await fetch(`http://localhost:3000/tasks/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_name: taskName }),
    });
    return res.json();
  },

  async deleteTask(taskId: number) {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    return res.json();
  },

  async toggleTask(taskId: number, state: boolean) {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });
    return res.json();
  }
};