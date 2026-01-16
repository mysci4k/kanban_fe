"use client";

import { Spinner } from "@/shared/components/ui/spinner";
import { useBoards } from "../../hooks/use-boards";
import { BoardCard } from "./board-card";
import { CreateBoardDialog } from "./create-board-dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { IconLayoutKanban } from "@tabler/icons-react";

export function BoardList() {
  const { data: boards = [], isLoading } = useBoards();

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <Spinner className="text-primary size-8" />
      </div>
    );
  }

  return boards.length === 0 ? (
    <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
      <Empty className="mx-auto max-w-md border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-primary/10 text-primary">
            <IconLayoutKanban />
          </EmptyMedia>
          <EmptyTitle>You don&apos;t have any boards yet</EmptyTitle>
          <EmptyDescription>
            Create your first board to get started.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <CreateBoardDialog />
        </EmptyContent>
      </Empty>
    </div>
  ) : (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Your boards</h2>
        <CreateBoardDialog />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}
