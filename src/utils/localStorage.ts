export const saveUser = (username: string): void => {
  localStorage.setItem('taskTrackerUser', username);
};

export const getUser = (): string | null => {
  return localStorage.getItem('taskTrackerUser');
};

export const saveTasks = (username: string, tasks: Task[]): void => {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

export const getTasks = (username: string): Task[] => {
  const tasks = localStorage.getItem(`tasks_${username}`);
  return tasks ? JSON.parse(tasks) : [];
};

export const clearUser = (): void => {
  localStorage.removeItem('taskTrackerUser');
};

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}