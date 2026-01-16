import { BoardList } from "@/features/kanban/components/board/board-list";

export default function DashboardPage() {
  return (
    <main className="mx-auto px-4 py-4 group-has-data-[collapsible=icon]/sidebar-wrapper:px-0">
      <BoardList />
    </main>
  );
}
