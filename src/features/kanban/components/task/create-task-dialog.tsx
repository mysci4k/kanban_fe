"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useCreateTask } from "../../hooks/task/use-create-task";
import { createTaskSchema } from "../../schemas/task.schema";

interface CreateTaskDialogProps {
  boardId: string;
  columnId: string;
}

export function CreateTaskDialog({ boardId, columnId }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const createTask = useCreateTask(boardId);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      columnId,
    },
    validators: {
      onChange: createTaskSchema,
    },
    onSubmit: async ({ value }) => {
      const tags = value.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await createTask.mutateAsync({
        title: value.title,
        description: value.description || null,
        tags: tags.length > 0 ? tags : null,
        columnId,
      });
      setOpen(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" className="h-full w-full justify-center">
            <IconPlus />
            Add task
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription>Add a new task to this column.</DialogDescription>
        </DialogHeader>
        <form
          id="createTaskForm"
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="Describe the task..."
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  <FieldLabel>Tags</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="bug, urgent, feature"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" form="createTaskForm">
              Create task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
