"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { DragOverlayContent } from "../components/dnd/drag-overlay-content";
import { useMoveColumn } from "../hooks/column/use-move-column";
import { useMoveTask } from "../hooks/task/use-move-task";
import { ColumnDto } from "../types/column.types";
import { TaskDto } from "../types/task.types";

interface DndProviderProps {
  boardId: string;
  columns: ColumnDto[];
  tasks: TaskDto[];
  children: React.ReactNode;
}

type ActiveItem =
  | { type: "column"; data: ColumnDto }
  | { type: "task"; data: TaskDto }
  | null;

export function KanbanDndProvider({
  boardId,
  columns,
  tasks,
  children,
}: DndProviderProps) {
  const [activeItem, setActiveItem] = useState<ActiveItem>(null);

  const moveColumn = useMoveColumn(boardId);
  const moveTask = useMoveTask(boardId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id as string;
    const activeType = active.data.current?.type as "column" | "task";

    if (activeType === "column") {
      const column = columns.find((c) => c.id === activeId);
      if (column) {
        setActiveItem({ type: "column", data: column });
      }
    } else if (activeType === "task") {
      const task = tasks.find((t) => t.id === activeId);
      if (task) {
        setActiveItem({ type: "task", data: task });
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeType = active.data.current?.type as "column" | "task";
    const overType = over.data.current?.type as "column" | "task";
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeType = active.data.current?.type as "column" | "task";
    const overType = over.data.current?.type as "column" | "task";

    if (activeType === overId) return;

    if (activeType === "column" && overType === "column") {
      const oldIndex = columns.findIndex((c) => c.id === activeId);
      const newIndex = columns.findIndex((c) => c.id === overId);

      if (oldIndex !== newIndex) {
        moveColumn.mutate({
          columnId: activeId,
          position: newIndex,
        });
      }

      return;
    }

    if (activeType === "task") {
      const task = tasks.find((t) => t.id === activeId);
      if (!task) return;

      let targetColumnId: string;
      let targetPosition: number;

      if (overType === "column") {
        targetColumnId = overId;
        const tasksInColumn = tasks.filter((t) => t.columnId === overId);
        targetPosition = tasksInColumn.length;
      } else if (overType === "task") {
        const overTask = tasks.find((t) => t.id === overId);
        if (!overTask) return;

        targetColumnId = overTask.columnId;
        const tasksInColumn = tasks.filter(
          (t) => t.columnId === targetColumnId,
        );
        targetPosition = tasksInColumn.findIndex((t) => t.id === overId);
      } else {
        return;
      }

      const tasksInCurrentColumn = tasks.filter(
        (t) => t.columnId === task.columnId,
      );
      const currentPosition = tasksInCurrentColumn.findIndex(
        (t) => t.id === activeId,
      );

      const isSameColumn = targetColumnId === task.columnId;
      const isSamePosition = isSameColumn && targetPosition === currentPosition;

      if (isSamePosition || (isSameColumn && activeId === overId)) {
        return;
      }

      moveTask.mutate({
        taskId: activeId,
        columnId: targetColumnId,
        position: targetPosition,
      });
    }
  };

  const columnsIds = columns.map((c) => c.id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={columnsIds}
        strategy={horizontalListSortingStrategy}
      >
        {children}
      </SortableContext>

      <DragOverlayContent activeItem={activeItem} />
    </DndContext>
  );
}
