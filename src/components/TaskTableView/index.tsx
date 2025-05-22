import { useState } from "react";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";

import { Task } from "@/models/task";

import { TaskDetailsModal } from "@/components/TaskDetailsModal";
import { TaskDifficultyChip } from "@/components/TaskDifficultyChip";
import { TaskStatusChip } from "@/components/TaskStatusChip";

import S from "./index.module.css";

export function TasksTableView({
  tasks,
  loading,
}: {
  tasks: Task[];
  loading: boolean;
}) {
  const {
    isOpen: isTaskDetailsOpen,
    onOpen: onTaskDetailsOpen,
    onClose: onTaskDetailsClose,
  } = useDisclosure();
  const [task, setTask] = useState<Task | null>(null);

  return (
    <div className={S.tasks}>
      <Table selectionMode="single">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Difficulty</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>CreatedAt</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={
            <div className={S.loading}>
              <Spinner label="Loading..." />
            </div>
          }
        >
          {(loading ? [] : tasks).map((task) => (
            <TableRow
              key={task.id}
              onClick={() => {
                setTask(task);
                onTaskDetailsOpen();
              }}
            >
              <TableCell>{task.name}</TableCell>
              <TableCell>
                <TaskDifficultyChip difficulty={task.difficulty} size="sm" />
              </TableCell>
              <TableCell>
                <TaskStatusChip
                  type={task.status.type}
                  timestamp={task.status.timestamp}
                />
              </TableCell>
              <TableCell>
                {task.createdAt.toLocaleString("ru-RU", {
                  second: "2-digit",
                  minute: "2-digit",
                  hour: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TaskDetailsModal
        task={task ?? undefined}
        isOpen={isTaskDetailsOpen}
        onClose={onTaskDetailsClose}
      />
    </div>
  );
}
