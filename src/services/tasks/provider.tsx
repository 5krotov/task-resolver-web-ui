"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";

import { createTasksService, TasksRepository } from ".";
import * as T from "./types";

type TaskServiceApi = ReturnType<typeof createTasksService>;

export const TasksServiceContext = createContext<TaskServiceApi | undefined>(
  undefined,
);

interface TasksServiceProviderProps extends PropsWithChildren {
  tasksRepo: TasksRepository;
}

export const TasksServiceProvider: FC<TasksServiceProviderProps> = ({
  tasksRepo,
  children,
}) => {
  const storeRef = useRef<TaskServiceApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createTasksService(tasksRepo);
  }

  return (
    <TasksServiceContext.Provider value={storeRef.current}>
      {children}
    </TasksServiceContext.Provider>
  );
};

export const useTasks = <D,>(selector: (store: T.TasksState) => D): D => {
  const tasksServiceContext = useContext(TasksServiceContext);

  if (!tasksServiceContext) {
    throw new Error(`useTasks must be used within TasksServieceProvider`);
  }

  return useStore(tasksServiceContext, selector);
};
