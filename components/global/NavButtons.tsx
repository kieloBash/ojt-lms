"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// UI
import { Button } from "../ui/button";
import {
  Backpack,
  BookOpen,
  Calendar,
  LayoutGrid,
  MessagesSquareIcon,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ParentAvatarButton from "./ParentAvatarButton";

import TooltipButton from "./TooltipButton";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import { isParent } from "@/utils/helpers/isParent";
import { useSelectedChild } from "./context/useSelectedChild";
import { StudentType } from "@/lib/interfaces/student.interface";
import Link from "next/link";

const NavButtons = ({ user }: { user: ParentType | UserType }) => {
  const pathname = usePathname();
  const router = useRouter();
  const ParentNavLinks = [
    { label: "dashboard", href: "/dashboard" },
    { label: "calendar", href: "/calendar" },
    { label: "messages", href: "/messages" },
    { label: "transactions", href: "/transactions" },
    { label: "settings", href: "/settings" },
  ];
  const TeacherNavLinks = [
    { label: "dashboard", href: "/dashboard" },
    { label: "calendar", href: "/calendar" },
    { label: "courses", href: "/courses" },
    { label: "messages", href: "/messages" },
    { label: "settings", href: "/settings" },
  ];

  const { setSelectedChild } = useSelectedChild();

  useEffect(() => {
    if (isParent(user))
      setSelectedChild((user?.children as StudentType[])[0] as StudentType);
  }, []);

  if (isParent(user)) {
    console.log(user);
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ParentAvatarButton parent={user} />
        {ParentNavLinks.map((nav) => {
          const isActive =
            (pathname.includes(nav.href) && nav.href.length > 1) ||
            pathname === nav.href;
          const iconClassName = `w-full h-full transition text-slate-400  ${
            isActive ? "text-black" : "group-hover:text-white"
          }`;
          return (
            <Link key={nav.label} href={nav.href}>
              <TooltipButton tooltip={nav.label}>
                <Button
                  variant={"ghost"}
                  className={`w-10 h-10 p-2 rounded-full group relative ${
                    isActive ? "bg-white" : "hover:bg-primary/50"
                  }`}
                >
                  {nav.label === "dashboard" && (
                    <LayoutGrid className={iconClassName} />
                  )}
                  {nav.label === "calendar" && (
                    <Calendar className={iconClassName} />
                  )}
                  {nav.label === "courses" && (
                    <Backpack className={iconClassName} />
                  )}
                  {nav.label === "messages" && (
                    <MessagesSquareIcon className={iconClassName} />
                  )}
                  {nav.label === "transactions" && (
                    <BookOpen className={iconClassName} />
                  )}
                  {nav.label === "settings" && (
                    <Settings className={iconClassName} />
                  )}
                </Button>
              </TooltipButton>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full h-20 pt-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user?.profileURL || ""} alt="@shadcn" />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={"right"}
            className="mt-6 w-80"
            sideOffset={8}
          >
            <DropdownMenuLabel className="flex items-center justify-start">
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{user.name}</span>
                <span className="font-semibold">{user.email}</span>
                <span className="font-normal text-slate-600">Teacher</span>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {TeacherNavLinks.map((nav) => {
        const isActive =
          (pathname.includes(nav.href) && nav.href.length > 1) ||
          pathname === nav.href;
        const iconClassName = `w-full h-full transition text-slate-400  ${
          isActive ? "text-black" : "group-hover:text-white"
        }`;
        return (
          <TooltipButton tooltip={nav.label}>
            <Button
              key={nav.label}
              variant={"ghost"}
              className={`w-10 h-10 p-2 rounded-full group relative ${
                isActive ? "bg-white" : "hover:bg-primary/50"
              }`}
              onClick={() => {
                router.replace(nav.href);
              }}
            >
              {nav.label === "dashboard" && (
                <LayoutGrid className={iconClassName} />
              )}
              {nav.label === "calendar" && (
                <Calendar className={iconClassName} />
              )}
              {nav.label === "courses" && (
                <Backpack className={iconClassName} />
              )}
              {nav.label === "messages" && (
                <MessagesSquareIcon className={iconClassName} />
              )}
              {nav.label === "transactions" && (
                <BookOpen className={iconClassName} />
              )}
              {nav.label === "settings" && (
                <Settings className={iconClassName} />
              )}
            </Button>
          </TooltipButton>
        );
      })}
    </div>
  );
};

export default NavButtons;
