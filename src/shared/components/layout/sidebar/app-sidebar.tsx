"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../ui/sidebar";
import { SidebarTop } from "./sidebar-top";
import { SidebarUser } from "./sidebar-user";
import { SidebarMain } from "./sidebar-main";
import { IconHome, IconLayoutKanban } from "@tabler/icons-react";

const sidebarData = {
  main: [
    {
      title: "Dashboard",
      href: "/app",
      icon: IconHome,
      isActive: false,
    },
    {
      title: "Boards",
      icon: IconLayoutKanban,
      href: "/app/boards",
      isActive: false,
      items: [
        {
          title: "All Boards",
          href: "/app/boards",
        },
        {
          title: "Archived Boards",
          href: "/app/boards/archived",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTop />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={sidebarData.main} />
      </SidebarContent>
      <SidebarFooter>{user ? <SidebarUser user={user} /> : null}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
