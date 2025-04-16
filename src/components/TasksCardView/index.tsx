import { useState } from "react";
import { Alert, Button, useDisclosure } from "@heroui/react";

import { Task } from "@/models/task";

import { useTasks } from "@/services/tasks";

import { TaskCard, TaskCardSkeleton } from "@/components/TaskCard";
import { TaskDetailsModal } from "@/components/TaskDetailsModal";

import S from "./index.module.css";

export function TasksCardView() {
  const perPage = useTasks((state) => state.tasks.params.perPage ?? 3);
  const tasks = useTasks((state) => state.tasks);
  const fetchWith = useTasks((state) => state.fetchWith);

  const {
    isOpen: isTaskDetailsOpen,
    onOpen: onTaskDetailsOpen,
    onClose: onTaskDetailsClose,
  } = useDisclosure();
  const [task, setTask] = useState<Task | null>(null);

  if (tasks.error === null) {
    if (tasks.loading) {
      return (
        <div className={S.tasks}>
          {Array.from(Array(perPage)).map((_, i) => (
            <TaskCardSkeleton key={i} />
          ))}
        </div>
      );
    } else {
      if (tasks.data !== null) {
        if (tasks.data.data.length > 0) {
          return (
            <div className={S.tasks}>
              {tasks.data?.data?.map((task) => (
                <TaskCard
                  key={task.id}
                  name={task.name}
                  difficulty={task.difficulty}
                  status={task.status}
                  onPress={() => {
                    setTask(task);
                    onTaskDetailsOpen();
                  }}
                />
              ))}
              <TaskDetailsModal
                task={task ?? undefined}
                isOpen={isTaskDetailsOpen}
                onClose={onTaskDetailsClose}
              />
            </div>
          );
        } else {
          return (
            <Alert
              color="default"
              variant="solid"
              title={"There is no one task yet."}
            />
          );
        }
      }
    }
  } else {
    return (
      <Alert
        color="danger"
        variant="solid"
        title={"Failed to load tasks"}
        endContent={
          <Button color="danger" variant="solid" onPress={() => fetchWith({})}>
            Retry
          </Button>
        }
      />
    );
  }
}
