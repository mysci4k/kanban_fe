import logoBlack from "@/public/logo_black.png";
import logoWhite from "@/public/logo_white.png";
import Image from "next/image";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";

export function SidebarTop() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/" aria-label="home">
          <SidebarMenuButton
            size="lg"
            className="cursor-pointer group-data-[collapsible=icon]:pl-1!"
          >
            <Image
              className="hidden dark:block"
              src={logoWhite}
              alt="Logo"
              width={24}
              height={24}
              priority
            />
            <Image
              className="dark:hidden"
              src={logoBlack}
              alt="Logo"
              width={24}
              height={24}
              priority
            />
            <span className="font-medium">Kanblast</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
