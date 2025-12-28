import { IconMenu } from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button, buttonVariants } from "../ui/button";
import { NavMenu } from "./nav-menu";
import Link from "next/link";
import Image from "next/image";

export function NavSheet() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon">
            <IconMenu className="size-5" />
          </Button>
        }
      />
      <SheetContent className="px-6 py-3">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Image
              className="hidden dark:block"
              src="/logo_white.png"
              alt="Logo"
              width={28}
              height={28}
            />
            <Image
              className="dark:hidden"
              src="/logo_black.png"
              alt="Logo"
              width={28}
              height={28}
            />
            Kanblast
          </SheetTitle>
        </SheetHeader>
        <NavMenu orientation="vertical" />
      </SheetContent>
    </Sheet>
  );
}
