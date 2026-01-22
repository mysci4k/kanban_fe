"use client";

import { Badge } from "@/shared/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { IconAlignLeft } from "@tabler/icons-react";
import { useState } from "react";
import { TaskDto } from "../../types/task.types";
import { TaskDetailDialog } from "./task-detail-dialog";

interface TaskCardProps {
  boardId: string;
  task: TaskDto;
  onDialogOpenChange?: (open: boolean) => void;
}

export function TaskCard({ boardId, task, onDialogOpenChange }: TaskCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setDetailOpen(open);
    onDialogOpenChange?.(open);
  };

  return (
    <>
      <div
        onClick={() => handleOpenChange(true)}
        className="bg-background hover:ring-primary/50 cursor-pointer rounded-lg border p-3 shadow-sm transition-all hover:shadow-md hover:ring-1"
      >
        <div className="flex items-start gap-1">
          <h4 className="line-clamp-2 flex-1 text-sm leading-tight font-medium">
            {task.title}
          </h4>

          {task.description && (
            <Tooltip>
              <TooltipTrigger
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
              >
                <IconAlignLeft className="size-4" />
              </TooltipTrigger>
              <TooltipContent>This task has a description</TooltipContent>
            </Tooltip>
          )}
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <TaskDetailDialog
        boardId={boardId}
        task={task}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}
