import { create } from "zustand";

import { TaskCreateParams } from "@/models/task";
import { ErrorMessages } from "@/models/form";

import { TasksRepository } from "./repository";
import * as T from "./types";

export const createTasksService = (tasksRepo: TasksRepository) => {
  return create<T.TasksState>()((set, get) => ({
    tasksRepo,

    createTaskForm: {
      fields: {},
      errorMessages: {},
      sending: false,
      error: null,
    },

    tasks: {
      params: { perPage: 24, page: 0 },
      data: null,
      loading: false,
      error: null,
    },

    init: (data) => set((state) => ({ ...state, ...data })),

    fetchWith: async (params) => {
      if (get().tasks.loading) return;

      set((state) => ({
        ...state,
        tasks: {
          ...state.tasks,
          params: { ...state.tasks.params, ...params },
          loading: true,
          error: null,
        },
      }));

      try {
        const tasks = await get().tasksRepo!.getTasks(get().tasks.params);
        set((state) => ({
          ...state,
          tasks: { ...state.tasks, data: tasks, loading: false, error: null },
        }));
      } catch (error) {
        if (error instanceof Error) {
          set((state) => ({
            ...state,
            tasks: { ...state.tasks, data: null, loading: false, error },
          }));
        }
      }
    },

    clearCreateTaskForm: () => {
      set((state) => ({
        ...state,
        createTaskForm: {
          fields: {},
          errorMessages: {},
          sending: false,
          error: null,
        },
      }));
    },

    setTaskName: (name) => {
      set((state) => ({
        ...state,
        createTaskForm: {
          ...state.createTaskForm,
          fields: {
            ...state.createTaskForm.fields,
            name: name,
          },
          errorMessages: {
            ...state.createTaskForm.errorMessages,
            name: undefined,
          },
          error: null,
        },
      }));
    },

    setTaskDifficulty: (difficulty) => {
      set((state) => ({
        ...state,
        createTaskForm: {
          ...state.createTaskForm,
          fields: {
            ...state.createTaskForm.fields,
            difficulty: difficulty,
          },
          errorMessages: {
            ...state.createTaskForm.errorMessages,
            difficulty: undefined,
          },
          error: null,
        },
      }));
    },

    create: async () => {
      const params = get().createTaskForm.fields;

      let incorrect = false;
      const errorMessages: ErrorMessages<TaskCreateParams> = {};

      if (params.name === undefined || params.name === "") {
        errorMessages.name = "Please enter a name";
        incorrect = true;
      }

      if (params.difficulty === undefined) {
        errorMessages.difficulty = "Please enter a difficulty";
        incorrect = true;
      }

      if (incorrect) {
        set((state) => ({
          ...state,
          createTaskForm: {
            ...state.createTaskForm,
            errorMessages: {
              ...state.createTaskForm.errorMessages,
              ...errorMessages,
            },
          },
        }));
        return false;
      }

      set((state) => ({
        ...state,
        createTaskForm: {
          ...state.createTaskForm,
          sending: true,
        },
      }));

      try {
        await get().tasksRepo!.createTask(params as TaskCreateParams);

        set((state) => ({
          ...state,
          createTaskForm: {
            ...state.createTaskForm,
            fields: {},
            errorMessages: {},
            sending: false,
          },
        }));

        new Promise(() => get().fetchWith({}));

        return true;
      } catch (e) {
        console.log(e);
        set((state) => ({
          ...state,
          createTaskForm: {
            ...state.createTaskForm,
            sending: false,
            error: new Error(),
          },
        }));
        return false;
      }
    },
  }));
};

export * from "./provider";

export type * from "./repository";
export type * from "./types";
