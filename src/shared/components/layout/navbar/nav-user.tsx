"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { User } from "@/features/auth/types/types";
import { IconHome, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

interface NavUserMenuProps {
  user: User;
}

export function NavUserMenu({ user }: NavUserMenuProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="size-8 rounded-full">
            <Avatar>
              <AvatarFallback>
                {`${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-foreground truncate font-medium">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            render={
              <Link href="/app">
                <IconHome />
                Application
              </Link>
            }
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            <IconLogout />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
