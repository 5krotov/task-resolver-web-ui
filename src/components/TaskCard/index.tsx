"use client";

import {
  PressEvent,
  Skeleton,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";

import { TaskDifficulty, TaskStatus } from "@/models/task";

import { TaskDifficultyChip } from "@/components/TaskDifficultyChip";
import { TaskStatusChip } from "@/components/TaskStatusChip";

import S from "./index.module.css";

export function TaskCard({
  name,
  difficulty,
  status,
  onPress,
}: {
  name: string;
  difficulty: TaskDifficulty;
  status: TaskStatus;
  onPress?: (e: PressEvent) => void;
}) {
  return (
    <Card isPressable={true} onPress={onPress}>
      <CardHeader className={S.header}>
        <h4 className={S.name}>{name}</h4>
        <TaskStatusChip type={status.type} timestamp={status.timestamp} />
      </CardHeader>
      <CardBody className={S.body}>
        <TaskDifficultyChip difficulty={difficulty} />
        <span className={S.timestamp}>
          {status.timestamp.toLocaleString("ru-RU", {
            second: "2-digit",
            minute: "2-digit",
            hour: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
      </CardBody>
    </Card>
  );
}

export function TaskCardSkeleton() {
  return (
    <Card>
      <CardHeader className={S.header}>
        <Skeleton className="w-4/5 rounded-lg">
          <div style={{ width: "128px", height: "24px" }}></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div style={{ width: "44px", height: "24px" }}></div>
        </Skeleton>
      </CardHeader>
      <CardBody className={S.body}>
        <Skeleton className="w-4/5 rounded-lg">
          <div style={{ width: "44px", height: "24px" }}></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div style={{ width: "128px", height: "24px" }}></div>
        </Skeleton>
      </CardBody>
    </Card>
  );
}
