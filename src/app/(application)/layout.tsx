import { AppHeader } from "@/shared/components/layout/header/app-header";
import { AppSidebar } from "@/shared/components/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
