"use client";

import { HeroUIProvider } from "@heroui/system";

import { HttpTasksRepository } from "@/repositories/tasks/http";

import { useTasks } from "@/services/tasks";

export function Providers({
  baseApiUrl,
  children,
}: {
  baseApiUrl: string;
  children: React.ReactNode;
}) {
  const tasksRepo = new HttpTasksRepository(baseApiUrl);

  const initTasksRepo = useTasks((state) => state.init);
  initTasksRepo({ tasksRepo });

  return <HeroUIProvider>{children}</HeroUIProvider>;
}
