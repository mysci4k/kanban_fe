"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableColumnProps {
  id: string;
  children: (props: {
    dragHandleProps: {
      ref: (element: HTMLElement | null) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } & Record<string, any>;
  }) => React.ReactNode;
}

export function SortableColumn({ id, children }: SortableColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { type: "column" },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const dragHandleProps = {
    ref: setActivatorNodeRef,
    ...attributes,
    ...listeners,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ dragHandleProps })}
    </div>
  );
}
