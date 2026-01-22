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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { IconTrash } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useDeleteTask } from "../../hooks/task/use-delete-task";
import { useUpdateTask } from "../../hooks/task/use-update-task";
import { updateTaskSchema } from "../../schemas/task.schema";
import { TaskDto } from "../../types/task.types";

interface TaskDetailDialogProps {
  boardId: string;
  task: TaskDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailDialog({
  boardId,
  task,
  open,
  onOpenChange,
}: TaskDetailDialogProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const updateTask = useUpdateTask(boardId);
  const deleteTask = useDeleteTask(boardId);

  const form = useForm({
    defaultValues: {
      title: task.title,
      description: task.description || "",
      tags: task.tags ? task.tags.join(", ") : "",
    },
    validators: {
      onChange: updateTaskSchema,
    },
    onSubmit: async ({ value }) => {
      const tags = value.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await updateTask.mutateAsync({
        taskId: task.id,
        data: {
          title: value.title,
          description: value.description || null,
          tags: tags.length > 0 ? tags : null,
        },
      });
      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: task.title,
        description: task.description || "",
        tags: task.tags ? task.tags.join(", ") : "",
      });
    }
  }, [open, task, form]);

  const handleDelete = () => {
    deleteTask.mutate(task.id);
    setDeleteOpen(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Task details</DialogTitle>
            <DialogDescription>
              Created{" "}
              {formatDistanceToNow(new Date(task.createdAt), {
                addSuffix: true,
              })}
            </DialogDescription>
          </DialogHeader>

          <form
            id="editTaskForm"
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      type="text"
                      placeholder="Task title"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Describe the task..."
                      rows={4}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="tags">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Tags (comma separated)</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="bug, urgent, feature"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="destructive"
                className="mr-auto"
                onClick={() => {
                  setDeleteOpen(true);
                  onOpenChange(false);
                }}
              >
                <IconTrash />
                Delete
              </Button>

              <DialogClose
                render={
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                }
              />
              <Button type="submit" form="editTaskForm">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <IconTrash />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be
              undone.
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
    </>
  );
}
