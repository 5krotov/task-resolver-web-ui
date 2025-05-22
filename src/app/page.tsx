"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Pagination, useDisclosure } from "@heroui/react";
import { RotateCw, Table, LayoutGrid } from "lucide-react";

import { useTasks } from "@/services/tasks";

import { TaskCreateModal } from "@/components/TaskCreateModal";
import { TasksCardView } from "@/components/TasksCardView";

import { TaskView } from "./enums";
import S from "./page.module.css";
import { useShallow } from "zustand/shallow";
import { TasksTableView } from "@/components/TaskTableView";

export default function Home() {
  const [view, setView] = useState<TaskView>(TaskView.CARDS);

  const {
    page,
    pages,
    perPage = 3,
    loading,
    error,
    tasks = [],
    fetchWith,
  } = useTasks(
    useShallow((state) => ({
      page: state.tasks.params.page,
      pages: state.tasks.data?.pages,
      perPage: state.tasks.params.perPage,
      loading: state.tasks.loading,
      error: state.tasks.error,
      tasks: state.tasks.data?.data,
      fetchWith: state.fetchWith,
    })),
  );

  useEffect(() => {
    fetchWith({});
  }, [fetchWith]);

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
            onPress={() =>
              setView(view === TaskView.CARDS ? TaskView.TABLE : TaskView.CARDS)
            }
          >
            {view === TaskView.CARDS ? (
              <Table size={18} />
            ) : (
              <LayoutGrid size={18} />
            )}
          </Button>
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
        {!error ? (
          loading || tasks.length > 0 ? (
            view === TaskView.CARDS ? (
              <TasksCardView
                tasks={tasks}
                loading={loading}
                skeletons={perPage}
              />
            ) : (
              <TasksTableView tasks={tasks} loading={loading} />
            )
          ) : (
            <Alert
              color="default"
              variant="solid"
              title={"There is no one task yet."}
            />
          )
        ) : (
          <Alert
            color="danger"
            variant="solid"
            title={"Failed to load tasks"}
            endContent={
              <Button
                color="danger"
                variant="solid"
                onPress={() => fetchWith({})}
              >
                Retry
              </Button>
            }
          />
        )}
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
