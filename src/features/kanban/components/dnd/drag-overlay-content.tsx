"use client";

import { DragOverlay } from "@dnd-kit/core";
import { ColumnDto } from "../../types/column.types";
import { TaskDto } from "../../types/task.types";

interface DragOverlayContentProps {
  activeItem:
    | { type: "column"; data: ColumnDto }
    | { type: "task"; data: TaskDto }
    | null;
}

export function DragOverlayContent({ activeItem }: DragOverlayContentProps) {
  if (!activeItem) return null;

  return (
    <DragOverlay>
      {activeItem.type === "column" ? (
        <div className="bg-muted/80 w-72 truncate rounded-lg border p-4 opacity-80 shadow-lg backdrop-blur-sm">
          <h3 className="font-medium">{activeItem.data.name}</h3>
        </div>
      ) : (
        <div className="bg-background w-64 rounded-lg border p-3 opacity-90 shadow-lg">
          <h4 className="line-clamp-2 text-sm font-medium">
            {activeItem.data.title}
          </h4>
        </div>
      )}
    </DragOverlay>
  );
}
