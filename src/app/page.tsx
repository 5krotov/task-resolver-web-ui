"use client";

import { useEffect } from "react";
import { Button, Pagination, useDisclosure } from "@heroui/react";
import { RotateCw } from "lucide-react";

import { useTasks } from "@/services/tasks";

import { TaskCreateModal } from "@/components/TaskCreateModal";
import { TasksCardView } from "@/components/TasksCardView";

import S from "./page.module.css";

export default function Home() {
  const fetchWith = useTasks((state) => state.fetchWith);

  useEffect(() => {
    fetchWith({});
  }, [fetchWith]);

  const page = useTasks((state) => state.tasks.params.page);
  const pages = useTasks((state) => state.tasks.data?.pages);
  const loading = useTasks((state) => state.tasks.loading);

  const {
    isOpen: isNewTaskOpen,
    onOpen: onNewTaskOpen,
    onClose: onNewTaskClose,
  } = useDisclosure();

  return (
    <div className={S.page}>
      <header>
        <p className={S.logo}>Task Resolver</p>
      </header>
      <main className={S.main}>
        <div className={S.actions}>
          <Button
            size="sm"
            color="default"
            isIconOnly={true}
            isLoading={loading}
            onPress={() => fetchWith({})}
          >
            <RotateCw size={18} />
          </Button>
          <Button
            size="sm"
            color="primary"
            variant="shadow"
            onPress={() => onNewTaskOpen()}
          >
            New
          </Button>
        </div>
        <TaskCreateModal isOpen={isNewTaskOpen} onClose={onNewTaskClose} />
        <TasksCardView />
        {page !== undefined && pages !== undefined && pages > 1 && (
          <Pagination
            page={page + 1}
            total={pages}
            isDisabled={loading}
            onChange={(page) => fetchWith({ page: page - 1 })}
          />
        )}
      </main>
    </div>
  );
}
