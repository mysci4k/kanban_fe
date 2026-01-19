import { BoardMemberRoleEnum } from "./member.types";

export type BoardEventType =
  | "BoardCreated"
  | "BoardUpdated"
  | "BoardDeleted"
  | "MemberAdded"
  | "MemberRoleChanged"
  | "MemberRemoved"
  | "ColumnCreated"
  | "ColumnUpdated"
  | "ColumnMoved"
  | "ColumnDeleted"
  | "TaskCreated"
  | "TaskUpdated"
  | "TaskMoved"
  | "TaskDeleted";

interface BaseBoardEvent<T extends BoardEventType, D> {
  type: T;
  data: D;
}

export interface BoardCreatedEventData {
  boardId: string;
  name: string;
  description: string | null;
  ownerId: string;
  timestamp: string;
}

export interface BoardUpdatedEventData {
  boardId: string;
  name: string | null;
  description: string | null;
  updatedBy: string;
  timestamp: string;
}

export interface BoardDeletedEventData {
  boardId: string;
  deletedBy: string;
  timestamp: string;
}

export interface MemberAddedEventData {
  boardId: string;
  userId: string;
  role: BoardMemberRoleEnum;
  addedBy: string;
  timestamp: string;
}

export interface MemberRoleChangedEventData {
  boardId: string;
  userId: string;
  role: BoardMemberRoleEnum;
  changedBy: string;
  timestamp: string;
}

export interface MemberRemovedEventData {
  boardId: string;
  userId: string;
  removedBy: string;
  timestamp: string;
}

export interface ColumnCreatedEventData {
  columnId: string;
  name: string;
  position: string;
  boardId: string;
  createdBy: string;
  timestamp: string;
}

export interface ColumnUpdatedEventData {
  columnId: string;
  name: string | null;
  updatedBy: string;
  timestamp: string;
}

export interface ColumnMovedEventData {
  columnId: string;
  oldPosition: number;
  newPosition: number;
  movedBy: string;
  timestamp: string;
}

export interface ColumnDeletedEventData {
  columnId: string;
  deletedBy: string;
  timestamp: string;
}

export interface TaskCreatedEventData {
  taskId: string;
  title: string;
  description: string | null;
  tags: string[] | null;
  position: string;
  columnId: string;
  createdBy: string;
  timestamp: string;
}

export interface TaskUpdatedEventData {
  taskId: string;
  title: string | null;
  description: string | null;
  tags: string[] | null;
  updatedBy: string;
  timestamp: string;
}

export interface TaskMovedEventData {
  taskId: string;
  oldColumnId: string;
  newColumnId: string;
  oldPosition: number;
  newPosition: number;
  movedBy: string;
  timestamp: string;
}

export interface TaskDeletedEventData {
  taskId: string;
  deletedBy: string;
  timestamp: string;
}

export type BoardEvent =
  | BaseBoardEvent<"BoardCreated", BoardCreatedEventData>
  | BaseBoardEvent<"BoardUpdated", BoardUpdatedEventData>
  | BaseBoardEvent<"BoardDeleted", BoardDeletedEventData>
  | BaseBoardEvent<"MemberAdded", MemberAddedEventData>
  | BaseBoardEvent<"MemberRoleChanged", MemberRoleChangedEventData>
  | BaseBoardEvent<"MemberRemoved", MemberRemovedEventData>
  | BaseBoardEvent<"ColumnCreated", ColumnCreatedEventData>
  | BaseBoardEvent<"ColumnUpdated", ColumnUpdatedEventData>
  | BaseBoardEvent<"ColumnMoved", ColumnMovedEventData>
  | BaseBoardEvent<"ColumnDeleted", ColumnDeletedEventData>
  | BaseBoardEvent<"TaskCreated", TaskCreatedEventData>
  | BaseBoardEvent<"TaskUpdated", TaskUpdatedEventData>
  | BaseBoardEvent<"TaskMoved", TaskMovedEventData>
  | BaseBoardEvent<"TaskDeleted", TaskDeletedEventData>;

export type WebSocketStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export interface BoardWebSocketState {
  status: WebSocketStatus;
  error: Error | null;
}
