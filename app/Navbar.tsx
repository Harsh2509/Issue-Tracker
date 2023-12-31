"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const Navbar = () => {
  const links = [
    { text: "Dashboard", href: "/" },
    { text: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 h-14 items-center px-5">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={classNames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-color": true,
              })}
            >
              {link.text}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
