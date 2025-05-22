"use client";

import { HeroUIProvider } from "@heroui/system";

import { HttpTasksRepository } from "@/repositories/tasks/http";

import { TasksServiceProvider } from "@/services/tasks";

export function Providers({ children }: { children: React.ReactNode }) {
  const tasksRepo = new HttpTasksRepository();

  return (
    <HeroUIProvider>
      <TasksServiceProvider tasksRepo={tasksRepo}>
        {children}
      </TasksServiceProvider>
    </HeroUIProvider>
  );
}
