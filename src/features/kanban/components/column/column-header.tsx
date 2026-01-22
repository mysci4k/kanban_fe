"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  IconDotsVertical,
  IconEdit,
  IconGripVertical,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDeleteColumn } from "../../hooks/column/use-delete-column";
import { ColumnDto } from "../../types/column.types";
import { EditColumnDialog } from "./edit-column-dialog";

interface ColumnHeaderProps {
  boardId: string;
  column: ColumnDto;
  taskCount: number;
  dragHandleProps?: {
    ref: (element: HTMLElement | null) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } & Record<string, any>;
}

export function ColumnHeader({
  boardId,
  column,
  taskCount,
  dragHandleProps,
}: ColumnHeaderProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteColumn = useDeleteColumn(boardId);

  const handleDelete = () => {
    deleteColumn.mutate(column.id);
    setDeleteOpen(false);
  };

  return (
    <div className="flex h-12 items-center justify-between border-b p-3">
      <div className="mr-2 flex items-center truncate">
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground mr-1 cursor-grab touch-none active:cursor-grabbing"
          {...dragHandleProps}
        >
          <IconGripVertical size={18} />
        </button>

        <h3 className="text-sm font-medium">{column.name}</h3>
      </div>

      <div className="flex items-center">
        <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
          {taskCount}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost">
                <IconDotsVertical />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="min-w-36">
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <IconEdit />
              Edit column
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
            >
              <IconTrash />
              Delete column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <EditColumnDialog
        boardId={boardId}
        column={column}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <IconTrash />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete column</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this column? All tasks in this
              column will be deleted. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
