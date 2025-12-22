import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "../theme-switch";
import { Button } from "../ui/button";
import { NavMenu } from "./nav-menu";
import { NavSheet } from "./nav-sheet";

export function Navbar() {
  return (
    <nav className="bg-background/75 sticky top-0 z-20 h-16 border-b border-dashed backdrop-blur">
      <div className="m-auto flex h-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="home"
          className="flex items-center space-x-2"
        >
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
        </Link>

        <NavMenu orientation="horizontal" className="hidden lg:block" />

        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <Button
            className="hidden lg:inline-flex"
            nativeButton={false}
            render={<Link href="/login">Login</Link>}
          />

          <div className="lg:hidden">
            <NavSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
