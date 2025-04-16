import {
  Modal,
  ModalBody,
  ModalContent,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import { Task, TaskDifficulty, TaskStatusType } from "@/models/task";

import { TaskStatusChip } from "@/components/TaskStatusChip";
import { TaskDifficultyChip } from "@/components/TaskDifficultyChip";

import S from "./index.module.css";

const defaultTask: Task = {
  id: 0,
  name: "Default Task",
  difficulty: TaskDifficulty.EASY,
  status: { type: TaskStatusType.CREATED, timestamp: new Date(1e10) },
  createdAt: new Date(1e10),
  statusHistory: [],
};

export function TaskDetailsModal({
  task = defaultTask,
  isOpen = false,
  onClose,
}: {
  task?: Task;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" backdrop="opaque">
      <ModalContent>
        <ModalBody>
          <h1 className={S.name}>{task.name}</h1>
          <section className={S.details}>
            <div className={S.detailsGrid}>
              <div>Status</div>
              <TaskStatusChip
                type={task.status.type}
                timestamp={task.status.timestamp}
                size="sm"
              />
              <div>Difficulty</div>
              <TaskDifficultyChip difficulty={task.difficulty} />
              <div>Created At</div>
              <div>{task.createdAt.toLocaleString()}</div>
            </div>
          </section>
          <Table>
            <TableHeader>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATE</TableColumn>
            </TableHeader>
            <TableBody>
              {task.statusHistory.toReversed().map((status) => (
                <TableRow key={status.type}>
                  <TableCell>
                    <TaskStatusChip type={status.type} />
                  </TableCell>
                  <TableCell>{status.timestamp.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
