"use client";

import {
  closestCenter,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  getFirstCollision,
  MeasuringStrategy,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DragOverlayContent } from "../components/dnd/drag-overlay-content";
import { useMoveColumn } from "../hooks/column/use-move-column";
import { useMoveTask } from "../hooks/task/use-move-task";
import { ColumnDto } from "../types/column.types";
import { TaskDto } from "../types/task.types";

type Items = Record<string, TaskDto[]>;

interface DndProviderProps {
  boardId: string;
  columns: ColumnDto[];
  tasks: TaskDto[];
  children: React.ReactNode;
}

type ActiveItem =
  | { type: "column"; data: ColumnDto }
  | { type: "task"; data: TaskDto }
  | null;

interface KanbanDndContextValue {
  items: Items;
}

const KanbanDndContext = createContext<KanbanDndContextValue | null>(null);

export function useKanbanDnd() {
  const context = useContext(KanbanDndContext);
  if (!context) {
    throw new Error("useKanbanDnd must be used within KanbanDndProvider");
  }

  return context;
}

function groupTasksByColumn(columns: ColumnDto[], tasks: TaskDto[]): Items {
  const grouped: Items = {};

  for (const column of columns) {
    grouped[column.id] = [];
  }
  for (const task of tasks) {
    if (grouped[task.columnId]) {
      grouped[task.columnId].push(task);
    }
  }
  for (const columnId of Object.keys(grouped)) {
    grouped[columnId].sort((a, b) => a.position.localeCompare(b.position));
  }

  return grouped;
}

function findContainer(id: string, items: Items): string | undefined {
  if (id in items) return id;

  return Object.keys(items).find((columnId) =>
    items[columnId].some((t) => t.id === id),
  );
}

export function KanbanDndProvider({
  boardId,
  columns,
  tasks,
  children,
}: DndProviderProps) {
  const [activeItem, setActiveItem] = useState<ActiveItem>(null);

  const baseItems = useMemo(
    () => groupTasksByColumn(columns, tasks),
    [columns, tasks],
  );

  const [dragItems, setDragItems] = useState<Items | null>(null);

  const items = dragItems ?? baseItems;

  const recentlyMovedToNewContainer = useRef(false);

  const lastOverId = useRef<UniqueIdentifier | null>(null);

  const moveColumn = useMoveColumn(boardId);
  const moveTask = useMoveTask(boardId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeItem?.type === "column") {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.data.current?.type === "column",
          ),
        });
      }

      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? pointerIntersections
          : rectIntersection(args);

      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId as string];
          if (containerItems.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.some((t) => t.id === container.id),
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      if (recentlyMovedToNewContainer.current) {
        lastOverId.current =
          activeItem?.type === "task" ? activeItem.data.id : null;
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeItem, items],
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id as string;
    const activeType = active.data.current?.type as "column" | "task";

    setDragItems(baseItems);

    if (activeType === "column") {
      const column = columns.find((c) => c.id === activeId);
      if (column) {
        setActiveItem({ type: "column", data: column });
      }
    } else if (activeType === "task") {
      for (const columnId of Object.keys(baseItems)) {
        const task = baseItems[columnId].find((t) => t.id === activeId);
        if (task) {
          setActiveItem({ type: "task", data: task });
          break;
        }
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overId = over?.id;

    if (overId == null) return;

    const activeType = active.data.current?.type as "column" | "task";

    if (activeType !== "task") return;

    const activeId = active.id as string;

    const overContainer = findContainer(overId as string, items);
    const activeContainer = findContainer(activeId, items);

    if (!overContainer || !activeContainer) return;

    if (activeContainer === overContainer) return;

    setDragItems((prev) => {
      const currentItems = prev ?? baseItems;
      const activeItems = currentItems[activeContainer];
      const overItems = currentItems[overContainer];

      const activeIndex = activeItems.findIndex((t) => t.id === activeId);
      const overIndex =
        overId in currentItems
          ? overItems.length
          : overItems.findIndex((t) => t.id === overId);

      let newIndex: number;
      if (overId in currentItems) {
        newIndex = overItems.length;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
      }

      recentlyMovedToNewContainer.current = true;

      const movedTask = {
        ...activeItems[activeIndex],
        columnId: overContainer,
      };

      return {
        ...currentItems,
        [activeContainer]: activeItems.filter((t) => t.id !== activeId),
        [overContainer]: [
          ...overItems.slice(0, newIndex),
          movedTask,
          ...overItems.slice(newIndex),
        ],
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeType = active.data.current?.type as "column" | "task";

    if (activeType === "column" && over) {
      const activeId = active.id as string;
      const overId = over.id as string;
      const overType = over.data.current?.type;

      if (overType === "column" && activeId !== overId) {
        const oldIndex = columns.findIndex((c) => c.id === activeId);
        const newIndex = columns.findIndex((c) => c.id === overId);

        if (oldIndex !== newIndex) {
          moveColumn.mutate({
            columnId: activeId,
            position: newIndex,
          });
        }
      }
    }

    if (activeType === "task") {
      const activeId = active.id as string;

      let currentColumnId: string | null = null;
      let currentIndex = -1;

      for (const columnId of Object.keys(items)) {
        const index = items[columnId].findIndex((t) => t.id === activeId);
        if (index !== -1) {
          currentColumnId = columnId;
          currentIndex = index;
          break;
        }
      }

      if (currentColumnId && over) {
        const overId = over.id as string;
        const overType = over.data.current?.type;

        if (overType === "task") {
          const overIndex = items[currentColumnId].findIndex(
            (t) => t.id === overId,
          );

          if (overIndex !== -1 && currentIndex !== overIndex) {
            const finalIndex = overIndex;

            setDragItems((prev) => {
              const currentItems = prev ?? baseItems;

              return {
                ...currentItems,
                [currentColumnId!]: arrayMove(
                  currentItems[currentColumnId!],
                  currentIndex,
                  overIndex,
                ),
              };
            });

            currentIndex = finalIndex;
          }
        }

        const originalTask = Object.values(baseItems)
          .flat()
          .find((t) => t.id === activeId);

        const originalColumnId = originalTask?.columnId;
        const originalIndex =
          originalTask && originalColumnId
            ? (baseItems[originalColumnId]?.findIndex(
                (t) => t.id === activeId,
              ) ?? -1)
            : -1;

        const hasColumnChanged = originalColumnId !== currentColumnId;
        const hasPositionChanged = originalIndex !== currentIndex;

        if (hasColumnChanged || hasPositionChanged) {
          moveTask.mutate({
            taskId: activeId,
            columnId: currentColumnId,
            position: currentIndex,
          });
        }
      }
    }

    setActiveItem(null);
    setDragItems(null);
  };

  const handleDragCancel = () => {
    setActiveItem(null);
    setDragItems(null);
  };

  const columnsIds = columns.map((c) => c.id);

  return (
    <KanbanDndContext.Provider value={{ items }}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={columnsIds}
          strategy={horizontalListSortingStrategy}
        >
          {children}
        </SortableContext>

        <DragOverlayContent activeItem={activeItem} />
      </DndContext>
    </KanbanDndContext.Provider>
  );
}
