import { AnyJSON } from "@/models/json";

export type TaskStatusModel = {
  status: number;
  timestamp: string;
};

export function isTaskStatusModel(obj: AnyJSON): obj is TaskStatusModel {
  return typeof obj.status === "number" && typeof obj.timestamp === "string";
}

export type TaskModel = {
  id: number;
  name: string;
  difficulty: number;
  status_history: TaskStatusModel[];
};

export function isTaskModel(obj: AnyJSON): obj is TaskModel {
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.difficulty === "number" &&
    Array.isArray(obj.status_history) &&
    obj.status_history.every((status: AnyJSON) => isTaskStatusModel(status))
  );
}

export type TasksModel = {
  pages: number;
  tasks: TaskModel[];
};

export function isTasksModel(obj: AnyJSON): obj is TasksModel {
  return (
    typeof obj.pages === "number" &&
    Array.isArray(obj.tasks) &&
    obj.tasks.every((task: AnyJSON) => isTaskModel(task))
  );
}

export type TaskCreateParamsModel = {
  name: string;
  difficulty: number;
};
