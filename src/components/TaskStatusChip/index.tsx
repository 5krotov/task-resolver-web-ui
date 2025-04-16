"use client";

import { useMemo } from "react";
import { Chip, Tooltip } from "@heroui/react";

import { TaskStatusType } from "@/models/task";

export function TaskStatusChip({
  type,
  timestamp,
  size = "sm",
}: {
  type: TaskStatusType;
  timestamp?: Date;
  size?: "md" | "sm" | "lg";
}) {
  const color = useMemo(() => {
    switch (type) {
      case TaskStatusType.CREATED:
        return "primary";
      case TaskStatusType.PENDING:
        return "secondary";
      case TaskStatusType.IN_PROGRESS:
        return "warning";
      case TaskStatusType.DONE:
        return "success";
    }
  }, [type]);

  const label = useMemo(() => {
    switch (type) {
      case TaskStatusType.CREATED:
        return "Created";
      case TaskStatusType.PENDING:
        return "Pending";
      case TaskStatusType.IN_PROGRESS:
        return "In Progress";
      case TaskStatusType.DONE:
        return "Done";
    }
  }, [type]);

  if (timestamp) {
    return (
      <Tooltip
        content={timestamp?.toLocaleString("ru-RU", {
          second: "2-digit",
          minute: "2-digit",
          hour: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
        color={color}
      >
        <Chip color={color} size={size} variant="shadow">
          {label}
        </Chip>
      </Tooltip>
    );
  } else {
    return (
      <Chip color={color} size={size} variant="shadow">
        {label}
      </Chip>
    );
  }
}
