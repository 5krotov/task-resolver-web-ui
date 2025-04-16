"use client";

import { useMemo } from "react";
import { Chip } from "@heroui/react";

import { TaskDifficulty } from "@/models/task";

export function TaskDifficultyChip({
  difficulty,
  size = "sm",
}: {
  difficulty: TaskDifficulty;
  size?: "md" | "sm" | "lg";
}) {
  const color = useMemo(() => {
    switch (difficulty) {
      case TaskDifficulty.EASY:
        return "success";
      case TaskDifficulty.MEDIUM:
        return "warning";
      case TaskDifficulty.HARD:
        return "danger";
    }
  }, [difficulty]);

  const label = useMemo(() => {
    switch (difficulty) {
      case TaskDifficulty.EASY:
        return "Easy";
      case TaskDifficulty.MEDIUM:
        return "Medium";
      case TaskDifficulty.HARD:
        return "Hard";
    }
  }, [difficulty]);

  return (
    <Chip color={color} size={size} variant="flat">
      {label}
    </Chip>
  );
}
