import { Task, TaskCreateParams, TasksSearchParams } from "@/models/task";

import { isTaskModel, isTasksModel } from "./models";
import {
  paginatedTasksFromTaskSearchData,
  queryParamsFromTasksSearchParams,
  taskCreateParamsModelFromTaskCreateParams,
  taskFromTaskModel,
} from "./mappers";
import { Paginated } from "@/models/search";

export class HttpTasksRepository {
  constructor(public baseUrl: string) {}

  async getTasks(
    params: Partial<TasksSearchParams>,
  ): Promise<Paginated<Task[]>> {
    const url = `${this.baseUrl}/task?${queryParamsFromTasksSearchParams(params)}`;
    const [response] = await Promise.all([
      fetch(url),
      new Promise<void>((resolve) => setTimeout(() => resolve(), 500)),
    ]);

    if (!response.ok) throw Error("bad request");

    const data = await response.json();

    if (!isTasksModel(data)) throw Error("unexpected response body");

    return paginatedTasksFromTaskSearchData(data);
  }

  async createTask(params: TaskCreateParams): Promise<Task> {
    const url = `${this.baseUrl}/task`;
    const [response] = await Promise.all([
      fetch(url, {
        method: "POST",
        body: JSON.stringify(taskCreateParamsModelFromTaskCreateParams(params)),
      }),
      new Promise<void>((resolve) => setTimeout(() => resolve(), 500)),
    ]);

    if (!response.ok) throw Error("bad request");

    const data = await response.json();

    if (!isTaskModel(data)) throw Error("unexpected response body");

    return taskFromTaskModel(data);
  }
}
