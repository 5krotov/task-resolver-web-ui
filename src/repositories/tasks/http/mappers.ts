import {
  Task,
  TaskCreateParams,
  TaskDifficulty,
  TasksSearchParams,
  TaskStatus,
  TaskStatusType,
} from "@/models/task";
import { Paginated } from "@/models/search";

import {
  TaskCreateParamsModel,
  TaskModel,
  TasksModel,
  TaskStatusModel,
} from "./models";

export function queryParamsFromTasksSearchParams(
  params: Partial<TasksSearchParams>,
): string {
  const model = new URLSearchParams();

  if (params.page !== undefined) model.append("page", params.page.toString());
  if (params.perPage !== undefined)
    model.append("per_page", params.perPage.toString());

  return model.toString();
}

export function taskModelDiffucultyFromTaskDifficulty(
  difficulty: TaskDifficulty,
): number {
  switch (difficulty) {
    case TaskDifficulty.EASY:
      return 0;
    case TaskDifficulty.MEDIUM:
      return 1;
    case TaskDifficulty.HARD:
      return 2;
  }
}

export function taskDiffucultyFromTaskModelDifficulty(
  difficulty: number,
): TaskDifficulty {
  switch (difficulty) {
    case 0:
      return TaskDifficulty.EASY;
    case 1:
      return TaskDifficulty.MEDIUM;
    case 2:
      return TaskDifficulty.HARD;
    default:
      throw TypeError(
        `cannot determine TaskDifficulty for value ${difficulty}`,
      );
  }
}

export function taskModelStatusFromTaskStatus(
  status: TaskStatus,
): TaskStatusModel {
  let type: number;
  switch (status.type) {
    case TaskStatusType.CREATED:
      type = 0;
      break;
    case TaskStatusType.PENDING:
      type = 1;
      break;
    case TaskStatusType.IN_PROGRESS:
      type = 2;
      break;
    case TaskStatusType.DONE:
      type = 3;
      break;
  }

  return {
    status: type,
    timestamp: status.timestamp.toUTCString(),
  };
}

export function taskStatusFromTaskModelStatus(
  model: TaskStatusModel,
): TaskStatus {
  let type: TaskStatusType;
  switch (model.status) {
    case 0:
      type = TaskStatusType.CREATED;
      break;
    case 1:
      type = TaskStatusType.PENDING;
      break;
    case 2:
      type = TaskStatusType.IN_PROGRESS;
      break;
    case 3:
      type = TaskStatusType.DONE;
      break;
    default:
      throw TypeError(`cannot determine TaskStatusType for value ${model}`);
  }

  const timestamp = Date.parse(model.timestamp);
  if (Number.isNaN(timestamp))
    throw new Error(`cannot parse timestamp ${model.timestamp}`);

  return {
    type,
    timestamp: new Date(timestamp),
  };
}

export function taskModelFromTask(task: Task): TaskModel {
  return {
    id: task.id,
    name: task.name,
    difficulty: taskModelDiffucultyFromTaskDifficulty(task.difficulty),
    status_history: task.statusHistory.map((status) =>
      taskModelStatusFromTaskStatus(status),
    ),
  };
}

export function taskFromTaskModel(model: TaskModel): Task {
  const statusHistory = model.status_history.map((model) =>
    taskStatusFromTaskModelStatus(model),
  );

  return {
    id: model.id,
    name: model.name,
    difficulty: taskDiffucultyFromTaskModelDifficulty(model.difficulty),
    status: statusHistory.at(-1)!,
    createdAt: statusHistory[0].timestamp,
    statusHistory,
  };
}

export function paginatedTasksFromTaskSearchData(
  model: TasksModel,
): Paginated<Task[]> {
  return {
    pages: model.pages,
    data: model.tasks.map((model) => taskFromTaskModel(model)),
  };
}

export function taskCreateParamsModelFromTaskCreateParams(
  params: TaskCreateParams,
): TaskCreateParamsModel {
  return {
    name: params.name,
    difficulty: taskModelDiffucultyFromTaskDifficulty(params.difficulty),
  };
}
