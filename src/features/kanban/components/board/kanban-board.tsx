"use client";

import { useMemo } from "react";
import { KanbanDndProvider, useKanbanDnd } from "../../providers/dnd-provider";
import { BoardDto } from "../../types/board.types";
import { ColumnDto } from "../../types/column.types";
import { TaskDto } from "../../types/task.types";
import { Column } from "../column/column";
import { CreateColumnDialog } from "../column/create-column-dialog";
import { SortableColumn } from "../dnd/sortable-column";

interface KanbanBoardProps {
  board: BoardDto;
  columns: ColumnDto[];
  tasks: TaskDto[];
}

function KanbanBoardContent({
  board,
  columns,
}: {
  board: BoardDto;
  columns: ColumnDto[];
}) {
  const { items } = useKanbanDnd();

  const sortedColumns = useMemo(() => {
    return [...columns].sort((a, b) => a.position.localeCompare(b.position));
  }, [columns]);

  return (
    <div className="flex h-[calc(100vh-6rem)] max-w-dvh gap-4 group-has-data-[collapsible=icon]/sidebar-wrapper:h-[calc(100vh-5rem)]">
      {sortedColumns.map((column) => (
        <SortableColumn key={column.id} id={column.id}>
          {({ dragHandleProps }) => (
            <Column
              boardId={board.id}
              column={column}
              tasks={items[column.id] || []}
              dragHandleProps={dragHandleProps}
            />
          )}
        </SortableColumn>
      ))}

      <CreateColumnDialog boardId={board.id} />
    </div>
  );
}

export function KanbanBoard({ board, columns, tasks }: KanbanBoardProps) {
  const sortedColumns = useMemo(() => {
    return [...columns].sort((a, b) => a.position.localeCompare(b.position));
  }, [columns]);

  return (
    <div className="flex-1 overflow-x-auto p-4">
      <KanbanDndProvider
        boardId={board.id}
        columns={sortedColumns}
        tasks={tasks}
      >
        <KanbanBoardContent board={board} columns={sortedColumns} />
      </KanbanDndProvider>
    </div>
  );
}
