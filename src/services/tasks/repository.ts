import { Paginated } from "@/models/search";
import { Task, TaskCreateParams, TasksSearchParams } from "@/models/task";

export interface TasksRepository {
  createTask: (params: TaskCreateParams) => Promise<Task>;
  getTasks: (params: Partial<TasksSearchParams>) => Promise<Paginated<Task[]>>;
}
