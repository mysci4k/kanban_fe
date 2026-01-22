"use client";

import { cn } from "@/shared/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { ColumnDto } from "../../types/column.types";
import { TaskDto } from "../../types/task.types";
import { SortableTask } from "../dnd/sortable-task";
import { CreateTaskDialog } from "../task/create-task-dialog";
import { TaskCard } from "../task/task-card";
import { ColumnHeader } from "./column-header";

interface ColumnProps {
  boardId: string;
  column: ColumnDto;
  tasks: TaskDto[];
  dragHandleProps?: {
    ref: (element: HTMLElement | null) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } & Record<string, any>;
}

export function Column({
  boardId,
  column,
  tasks,
  dragHandleProps,
}: ColumnProps) {
  const [openDialogTaskId, setOpenDialogTaskId] = useState<string | null>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column" },
  });

  const taskIds = tasks.map((t) => t.id);

  return (
    <div
      className={cn(
        "bg-muted/50 flex h-full w-72 shrink-0 flex-col rounded-lg border",
        isOver && "ring-primary/50 ring-2",
      )}
    >
      <ColumnHeader
        boardId={boardId}
        column={column}
        taskCount={tasks.length}
        dragHandleProps={dragHandleProps}
      />

      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-2 overflow-y-auto p-2"
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              id={task.id}
              disabled={openDialogTaskId === task.id}
            >
              <TaskCard
                boardId={boardId}
                task={task}
                onDialogOpenChange={(open) => {
                  setOpenDialogTaskId(open ? task.id : null);
                }}
              />
            </SortableTask>
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
            No tasks yet
          </div>
        )}
      </div>

      <div className="border-t p-2">
        <CreateTaskDialog boardId={boardId} columnId={column.id} />
      </div>
    </div>
  );
}
