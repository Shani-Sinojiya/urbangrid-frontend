"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";

export function Header() {
  const path = usePathname();

  return (
    <Navbar
      fluid
      rounded
      className="bg-transparent text-white hover:!text-gray-200"
    >
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Urban Grid
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          href="/signals"
          active={path === "/signals" || path === "/signals/"}
          className="!text-white hover:!text-gray-200"
        >
          Signals
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/accident-detection"
          className="!text-white hover:!text-gray-200"
          active={
            path === "/accident-detection" || path === "/accident-detection/"
          }
        >
          Accident Detection
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
