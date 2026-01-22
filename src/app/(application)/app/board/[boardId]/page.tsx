"use client";

import { KanbanBoard } from "@/features/kanban/components/board/kanban-board";
import { useBoard } from "@/features/kanban/hooks/board/use-board";
import { useColumns } from "@/features/kanban/hooks/column/use-columns";
import { useTasks } from "@/features/kanban/hooks/task/use-tasks";
import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { Spinner } from "@/shared/components/ui/spinner";
import { IconAlertCircle, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { use } from "react";

interface BoardPageProps {
  params: Promise<{ boardId: string }>;
}

export default function BoardPage({ params }: BoardPageProps) {
  const { boardId } = use(params);

  const {
    data: board,
    isLoading: boardLoading,
    error: boardError,
  } = useBoard(boardId);
  const { data: columns, isLoading: columnsLoading } = useColumns(boardId);
  const { data: tasks, isLoading: tasksLoading } = useTasks(boardId);

  const isLoading = boardLoading || columnsLoading || tasksLoading;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <Spinner className="text-primary size-8" />
      </div>
    );
  }

  if (boardError || !board) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <Empty className="mx-auto max-w-md border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-primary/10 text-primary">
              <IconAlertCircle />
            </EmptyMedia>
            <EmptyTitle>Board not found</EmptyTitle>
            <EmptyDescription>
              The board you&apos;re looking for doesn&apos;t exist or you
              don&apos;t have access to it.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Link href="/app">
              <Button variant="outline">
                <IconArrowLeft className="size-4" />
                Back to boards
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <KanbanBoard board={board} columns={columns || []} tasks={tasks || []} />
  );
}
