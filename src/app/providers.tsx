"use client";

import { HeroUIProvider } from "@heroui/system";

import { HttpTasksRepository } from "@/repositories/tasks/http";

import { useTasks } from "@/services/tasks";

export function Providers({ children }: { children: React.ReactNode }) {
  const tasksRepo = new HttpTasksRepository();

  useTasks((state) => state.init)({ tasksRepo });

  return <HeroUIProvider>{children}</HeroUIProvider>;
}
