"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HEADER_LINKS = [
  {
    href: "/home",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/subscriptions",
    label: "Subscriptions",
  },
  {
    href: "/faq",
    label: "FAQ",
  },
];
const HomeNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-[100] backdrop-blur-sm">
      <nav className="bg-white/90">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center justify-between w-full">
              <Link href={"/home"}>
                <div className="text-2xl font-[800] uppercase text-main-500">
                  Umonics <span className="text-dark-1">Method</span>
                </div>
              </Link>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  {HEADER_LINKS.map((nav) => {
                    const isActive =
                      (pathname.includes(nav.href) && nav.href.length > 1) ||
                      pathname === nav.href;

                    const linkClassName = isActive
                      ? "text-gray-800 hover:text-gray-800 dark:hover:text-white"
                      : "text-gray-300 hover:text-gray-800 dark:hover:text-white";
                    return (
                      <Link
                        className={`${linkClassName} transition px-3 py-2 text-sm font-semibold rounded-md`}
                        href={nav.href}
                      >
                        {nav.label}
                      </Link>
                    );
                  })}
                  <div className="flex gap-2 ml-2">
                    <Link href={"/authenticate/sign-up"}>
                      <Button onClick={() => {}} className="px-6">
                        Sign Up
                      </Button>
                    </Link>
                    <Link href={"/authenticate/sign-in"}>
                      <Button
                        onClick={() => {}}
                        variant={"outline"}
                        className="px-6 text-white bg-dark-1 hover:bg-dark-1/80 hover:text-white"
                      >
                        Log In
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="flex items-center ml-4 md:ml-6"></div>
            </div>
            <div className="flex -mr-2 md:hidden">
              <button className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md dark:text-white hover:text-gray-300 focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="w-8 h-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {HEADER_LINKS.map((nav) => {
              const isActive =
                (pathname.includes(nav.href) && nav.href.length > 1) ||
                pathname === nav.href;

              const linkClassName = isActive
                ? "text-gray-800"
                : "text-gray-300 hover:text-gray-800";
              return (
                <Link
                  className={`${linkClassName} transition block px-3 py-2 text-base font-medium rounded-md`}
                  href={nav.href}
                >
                  {nav.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;
