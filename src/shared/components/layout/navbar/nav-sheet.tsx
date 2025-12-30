import logoBlack from "@/public/logo_black.png";
import logoWhite from "@/public/logo_white.png";
import { IconMenu } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { NavMenu } from "./nav-menu";

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
              src={logoWhite}
              alt="Logo"
              width={28}
              height={28}
              priority
            />
            <Image
              className="dark:hidden"
              src={logoBlack}
              alt="Logo"
              width={28}
              height={28}
              priority
            />
            <span>Kanblast</span>
          </SheetTitle>
        </SheetHeader>
        <NavMenu orientation="vertical" />
      </SheetContent>
    </Sheet>
  );
}
