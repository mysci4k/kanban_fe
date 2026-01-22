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
} from "@/shared/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { useUpdateColumn } from "../../hooks/column/use-update-column";
import { updateColumnSchema } from "../../schemas/column.schema";
import { ColumnDto } from "../../types/column.types";

interface EditColumnDialogProps {
  boardId: string;
  column: ColumnDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditColumnDialog({
  boardId,
  column,
  open,
  onOpenChange,
}: EditColumnDialogProps) {
  const updateColumn = useUpdateColumn(boardId);

  const form = useForm({
    defaultValues: {
      name: column.name,
    },
    validators: {
      onChange: updateColumnSchema,
    },
    onSubmit: async ({ value }) => {
      await updateColumn.mutateAsync({
        columnId: column.id,
        data: { name: value.name },
      });
      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({ name: column.name });
    }
  }, [open, column.name, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit column</DialogTitle>
          <DialogDescription>Update the column name.</DialogDescription>
        </DialogHeader>
        <form
          id="editColumnForm"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Column name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="To do"
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
            <Button type="submit" form="editColumnForm">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
