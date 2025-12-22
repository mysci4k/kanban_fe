import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/#home" },
  { name: "Features", href: "/#features" },
];

export function NavMenu({
  orientation = "horizontal",
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu> & {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList
        className={cn(
          "group list-none gap-0",
          className,
          orientation === "vertical"
            ? "flex h-full flex-col items-start justify-start space-y-2 px-4"
            : "lg:flex lg:gap-2",
        )}
      >
        {links.map((link) => (
          <NavigationMenuItem key={link.name}>
            <NavigationMenuLink
              className={clsx(navigationMenuTriggerStyle(), "bg-transparent")}
              render={<Link href={link.href}>{link.name}</Link>}
            />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
