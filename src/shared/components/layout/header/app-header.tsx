import { Separator } from "../../ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";
import { DynamicBreadcrumb } from "./dynamic-breadcrumb";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4 data-[orientation=vertical]:self-center"
        />
        <DynamicBreadcrumb />
      </div>
    </header>
  );
}
