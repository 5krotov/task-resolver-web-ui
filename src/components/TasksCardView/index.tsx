import { useState } from "react";
import { useDisclosure } from "@heroui/react";

import { Task } from "@/models/task";

import { TaskCard, TaskCardSkeleton } from "@/components/TaskCard";
import { TaskDetailsModal } from "@/components/TaskDetailsModal";

import S from "./index.module.css";

export function TasksCardView({
  tasks,
  loading,
  skeletons,
}: {
  tasks: Task[];
  loading: boolean;
  skeletons: number;
}) {
  const {
    isOpen: isTaskDetailsOpen,
    onOpen: onTaskDetailsOpen,
    onClose: onTaskDetailsClose,
  } = useDisclosure();
  const [task, setTask] = useState<Task | null>(null);

  if (loading) {
    return (
      <div className={S.tasks}>
        {Array.from(Array(skeletons)).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    );
  } else {
    if (tasks.length > 0) {
      return (
        <div className={S.tasks}>
          {tasks.map((task) => (
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
    }
  }
}
