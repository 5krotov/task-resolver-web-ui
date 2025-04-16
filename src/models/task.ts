import { SearchPagination, SearchSort } from "./search";

export enum TaskDifficulty {
  EASY,
  MEDIUM,
  HARD,
}

export enum TaskStatusType {
  CREATED,
  PENDING,
  IN_PROGRESS,
  DONE,
}

export type TaskStatus = {
  type: TaskStatusType;
  timestamp: Date;
};

export type Task = {
  id: number;
  name: string;
  difficulty: TaskDifficulty;
  status: TaskStatus;
  createdAt: Date;
  statusHistory: TaskStatus[];
};

export interface TasksSearchParams
  extends SearchSort<"difficulty" | "status">,
    SearchPagination {
  search: string;
  difficulty: TaskDifficulty[];
  status: TaskStatus[];
}

export interface TaskCreateParams {
  name: string;
  difficulty: TaskDifficulty;
}
