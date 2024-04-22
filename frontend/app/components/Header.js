"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const currentPath = usePathname();

  const pages = [
    { name: "Home", path: "/" },
    { name: "Create user", path: "/create_user" },
    { name: "Log in", path: "/login" },
  ];

  const isActive = (path) => {
    return currentPath === path;
  };

  return (
    // <-------- Nav menu -------->
    <header className="flex items-center justify-between p-8">
      <div className="hidden sm:flex">
        <Link className="text-blue-600 text-2xl p-4 no-underline" href="/">
          {" "}
          Money bank
        </Link>
      </div>
      <div className="sm:hidden block">
        <Link className="text-blue-600 text-2xl p-4 no-underline" href="/">
          {" "}
          MB
        </Link>
      </div>
      <nav>
        <ul className="flex items-center whitespace-nowrap md:space-x-16 space-x-8 ">
          {pages.map((page, index) => (
            <li key={index} className="list-none p-2">
              <Link
                href={page.path}
                alt={page.name}
                className={
                  isActive(page.path)
                    ? "active no-underline"
                    : "no-underline text-blue-600"
                }
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
