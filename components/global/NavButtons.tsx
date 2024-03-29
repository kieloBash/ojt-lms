"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// UI
import { Button } from "../ui/button";
import {
  Backpack,
  BookOpen,
  Calendar,
  Info,
  LayoutGrid,
  MessagesSquareIcon,
  Settings,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
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
    // { label: "help", href: "/help" },
  ];
  const TeacherNavLinks = [
    { label: "dashboard", href: "/dashboard" },
    { label: "calendar", href: "/calendar" },
    { label: "materials", href: "/materials" },
    { label: "courses", href: "/courses" },
    { label: "messages", href: "/messages" },
    { label: "settings", href: "/settings" },
    // { label: "help", href: "/help" },
  ];
  const AdminNavLinks = [
    { label: "dashboard", href: "/dashboard" },
    // { label: "calendar", href: "/calendar" },
    // { label: "materials", href: "/materials" },
    { label: "transactions", href: "/transactions" },
    { label: "users", href: "/users" },
    { label: "courses", href: "/courses" },
    { label: "messages", href: "/messages" },
    // { label: "settings", href: "/settings" },
    // { label: "help", href: "/help" },
  ];

  const { setSelectedChild, selectedChild } = useSelectedChild();

  useEffect(() => {
    if (isParent(user)) {
      if (!selectedChild)
        setSelectedChild((user?.children as StudentType[])[0] as StudentType);
    }
  }, [user, selectedChild]);

  if (isParent(user)) {
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
                  {nav.label === "help" && <Info className={iconClassName} />}
                </Button>
              </TooltipButton>
            </Link>
          );
        })}
      </div>
    );
  }

  const preferredLinks =
    user.role === "teacher" ? TeacherNavLinks : AdminNavLinks;

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
                <span className="font-normal capitalize text-slate-600">
                  {user.role}
                </span>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {preferredLinks.map((nav) => {
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
                {nav.label === "materials" && (
                  <BookOpen className={iconClassName} />
                )}
                {nav.label === "users" && <Users className={iconClassName} />}
                {nav.label === "help" && <Info className={iconClassName} />}
              </Button>
            </TooltipButton>
          </Link>
        );
      })}
    </div>
  );
};

export default NavButtons;
