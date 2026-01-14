"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import logoBlack from "@/public/logo_black.png";
import logoWhite from "@/public/logo_white.png";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import { ThemeSwitch } from "../theme-switch";
import { NavMenu } from "./nav-menu";
import { NavSheet } from "./nav-sheet";
import { NavUserMenu } from "./nav-user";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();

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
            src={logoWhite}
            alt="Logo"
            width={32}
            height={32}
            priority
          />
          <Image
            className="dark:hidden"
            src={logoBlack}
            alt="Logo"
            width={32}
            height={32}
            priority
          />
        </Link>

        <NavMenu orientation="horizontal" className="hidden lg:block" />

        <div className="flex items-center gap-3">
          <ThemeSwitch />

          {isAuthenticated && user ? (
            <NavUserMenu user={user} />
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "default" })}
            >
              Login
            </Link>
          )}

          <div className="lg:hidden">
            <NavSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
