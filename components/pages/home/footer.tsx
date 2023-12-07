"use client";
import React from "react";
import LOGO from "@/public/logo-2.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Globe, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-white border-t">
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="relative flex items-center justify-center w-full -mb-4 overflow-hidden">
          <Image src={LOGO} alt="Umonics Logo" width={500} />
        </div>
        <div className="flex items-center justify-between pt-10 text-sm font-light text-dark-1">
          <span className="">
            © Preschool Memory Enrichment Training Program by The Umonics Method
            All Rights Reserved 2023
          </span>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={"link"}
              onClick={() => {}}
              className="w-10 h-10 p-2"
            >
              <svg
                fill="currentColor"
                className="w-full h-full text-xl transition-colors duration-200 text-dark-1 hover:text-main-500"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
              </svg>
            </Button>
            <Button
              variant={"link"}
              onClick={() => {}}
              className="w-10 h-10 p-2"
            >
              <Instagram className="w-full h-full transition-colors text-dark-1 hover:text-main-500" />
            </Button>
            <Button
              variant={"link"}
              onClick={() => {}}
              className="w-10 h-10 p-2"
            >
              <Twitter className="w-full h-full transition-colors text-dark-1 hover:text-main-500" />
            </Button>
            <Button
              variant={"link"}
              onClick={() => {}}
              className="w-10 h-10 p-2"
            >
              <Globe className="w-full h-full transition-colors text-dark-1 hover:text-main-500" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
