import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

const links = [
  {
    title: "About",
    href: "/#",
  },
  {
    title: "Privacy",
    href: "/#",
  },
  {
    title: "Cookies",
    href: "/#",
  },
];

export function FooterSection() {
  return (
    <footer className="border-t border-b border-dashed py-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-center gap-6 sm:justify-between">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="hover:text-primary underline duration-150"
            >
              Kanblast
            </Link>
            . All rights reserved
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {links.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{link.title}</span>
              </Link>
            ))}
            <Link
              href="https://github.com/mysci4k/kanban_fe"
              target="_blank"
              className="text-muted-foreground hover:text-primary border-l pl-4 duration-150"
            >
              <IconBrandGithub className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
