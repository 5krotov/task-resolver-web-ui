"use client";

import {
  Alert,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";

import { TaskDifficulty } from "@/models/task";

import { useTasks } from "@/services/tasks";

import S from "./index.module.css";

const difficulties = [
  { difficulty: TaskDifficulty.EASY, label: "Easy", color: "success" },
  { difficulty: TaskDifficulty.MEDIUM, label: "Medium", color: "warning" },
  { difficulty: TaskDifficulty.HARD, label: "Hard", color: "danger" },
] as const;

export function TaskCreateModal({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const fields = useTasks((state) => state.createTaskForm.fields);
  const setName = useTasks((state) => state.setTaskName);
  const setDifficulty = useTasks((state) => state.setTaskDifficulty);
  const clearCreateTaskForm = useTasks((state) => state.clearCreateTaskForm);
  const errorMessages = useTasks((state) => state.createTaskForm.errorMessages);

  const create = useTasks((state) => state.create);
  const sending = useTasks((state) => state.createTaskForm.sending);
  const error = useTasks((state) => state.createTaskForm.error);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (sending) return;
        clearCreateTaskForm();
        onClose?.();
      }}
      size="md"
      backdrop="opaque"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create new task</ModalHeader>
            <ModalBody className={S.body}>
              <Input
                label="Name"
                value={fields.name}
                placeholder='e.g. "What a nice Workflow"'
                errorMessage={errorMessages.name ?? ""}
                maxLength={255}
                isRequired={true}
                isInvalid={errorMessages.name !== undefined}
                isDisabled={sending}
                onValueChange={setName}
              />
              <Select
                label="Diffiulty"
                selectedKeys={
                  fields.difficulty !== undefined
                    ? [fields.difficulty.toString()]
                    : []
                }
                errorMessage={errorMessages.difficulty ?? ""}
                isRequired={true}
                isInvalid={errorMessages.difficulty !== undefined}
                isDisabled={sending}
                onSelectionChange={(difficulties) => {
                  let difficulty = Array.from(difficulties)[0];

                  if (difficulty !== undefined) {
                    difficulty = Number.parseInt(
                      difficulty as string,
                    ) as TaskDifficulty;
                  }

                  setDifficulty(difficulty);
                }}
              >
                {difficulties.map(({ difficulty, label, color }) => (
                  <SelectItem key={difficulty} color={color}>
                    {label}
                  </SelectItem>
                ))}
              </Select>
              {error !== null && (
                <Alert
                  title={"Failed to create task"}
                  color="danger"
                  variant="solid"
                  className={S.error}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                isDisabled={sending}
                onPress={onClose}
              >
                Back
              </Button>
              <Button
                color="primary"
                variant="shadow"
                isLoading={sending}
                onPress={async () => (await create()) && onClose?.()}
              >
                {error === null ? "Create" : "Retry"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
