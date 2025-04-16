import {
  Task,
  TaskCreateParams,
  TaskDifficulty,
  TasksSearchParams,
} from "@/models/task";
import { Resource } from "@/models/resource";
import { Paginated } from "@/models/search";
import { Form } from "@/models/form";

import { TasksRepository } from "./repository";

export interface TasksData {
  tasksRepo: TasksRepository | null;

  createTaskForm: Form<Partial<TaskCreateParams>>;
  tasks: Resource<Paginated<Task[]>, Partial<TasksSearchParams>>;
}

export interface TasksState extends TasksData {
  init: (data: Partial<TasksData>) => void;
  fetchWith: (params: Partial<TasksSearchParams>) => Promise<void>;

  clearCreateTaskForm: () => void;
  setTaskName: (name: string) => void;
  setTaskDifficulty: (difficulty: TaskDifficulty) => void;
  create: () => Promise<boolean>;
}
