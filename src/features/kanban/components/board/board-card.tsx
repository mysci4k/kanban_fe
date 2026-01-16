import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { IconLayoutKanban } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { BoardDto } from "../../types/board.types";

interface BoardCardProps {
  board: BoardDto;
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`/app/board/${board.id}`}>
      <Card className="hover:ring-primary/50 min-h-full transition-all hover:shadow-md">
        <CardHeader className="flex flex-1">
          <div className="bg-primary/10 rounded-lg p-1">
            <IconLayoutKanban className="text-primary" />
          </div>

          <div className="pl-2">
            <CardTitle className="line-clamp-1">{board.name}</CardTitle>
            {board.description && (
              <CardDescription className="line-clamp-2">
                {board.description}
              </CardDescription>
            )}
          </div>
        </CardHeader>

        <CardFooter>
          <p className="text-muted-foreground text-xs">
            Updated{" "}
            {formatDistanceToNow(new Date(board.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
