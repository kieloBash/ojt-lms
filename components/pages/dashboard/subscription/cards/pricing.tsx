"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PricingCard = ({
  title,
  price,
  discountedPrice,
  description,
  offers,
  duration,
  link,
  discounted,
}: {
  title: string;
  price: number;
  discounted: boolean;
  discountedPrice?: number;
  description: string;
  offers: { title: string; details: string; enabled: boolean }[];
  duration: "month" | "year";
  link: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      {/* MOBILE */}
      <div className="relative flex flex-col w-full px-4 py-16 text-center lg:hidden xl:hidden md:hidden">
        {title === "Ultimate" && (
          <Badge className="absolute flex items-center justify-center w-40 text-base text-center translate-x-1/2 top-4 right-1/2">
            Most Registered
          </Badge>
        )}
        <h2 className="text-2xl font-bold leading-none">{title}</h2>
        <div className="w-full mt-8 mb-8 text-6xl font-medium leading-none">
          {discounted || duration === "year" ? (
            <>
              <span className="mr-4 text-5xl line-through text-slate-300">
                ${price}
              </span>
              ${discountedPrice}
            </>
          ) : (
            <>${price}</>
          )}
        </div>
        <p className="text-xs font-light text-muted-foreground">
          per {duration}
        </p>
        <p className="text-xs font-light text-muted-foreground">
          paid in US dollars
        </p>
        <div className="flex items-center justify-center w-full">
          <Link href={link}>
            <Button
              className="h-16 px-10 mt-8 text-lg font-bold"
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                console.log(link);
                router.push(link);
              }}
            >
              Subscribe Now{" "}
              {isLoading && <Loader2 className="w-6 h-6 ml-2 animate-spin" />}
            </Button>
          </Link>
        </div>
        <h4 className="h-20 mt-8 text-base text-muted-foreground">
          {description}
        </h4>
        <Separator className="h-1 mt-10 mb-6 bg-main-700" />
        <ul className="flex flex-col gap-3 text-sm">
          {offers.map((o, index) => {
            return (
              <li key={index} className="grid grid-cols-10">
                {o.enabled ? (
                  <>
                    <Check className="w-6 h-6 text-green-500" />
                    <p className="col-span-9 text-left">{o.title}</p>
                  </>
                ) : (
                  <>
                    <div></div>
                    <p className="col-span-9 text-left text-slate-300">
                      {o.title}
                    </p>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* DESKTOP */}
      <div className="relative flex-col hidden px-10 pt-20 pb-16 text-center lg:flex xl:flex md:flex">
        {title === "Ultimate" && (
          <Badge className="absolute text-base translate-x-1/2 top-8 right-1/2">
            Most Registered
          </Badge>
        )}
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="w-full mt-12 mb-8 text-6xl font-medium">
          {discounted || duration === "year" ? (
            <>
              <span className="mr-4 line-through text-slate-300">${price}</span>
              ${discountedPrice}
            </>
          ) : (
            <>${price}</>
          )}
        </div>
        <p className="mb-2 text-sm font-light text-muted-foreground">
          per {duration}
        </p>
        <p className="text-sm font-light text-muted-foreground">
          paid in US dollars
        </p>
        <div className="flex items-center justify-center w-full">
          <Link href={link}>
            <Button className="h-16 px-16 mt-8 text-lg font-bold">
              Subscribe Now
            </Button>
          </Link>
        </div>
        <h4 className="h-20 mt-8 text-lg text-muted-foreground">
          {description}
        </h4>
        <Separator className="h-1 mt-10 mb-6 bg-main-700" />
        <ul className="flex flex-col gap-3">
          {offers.map((o, index) => {
            return (
              <li key={index} className="grid grid-cols-10">
                {o.enabled ? (
                  <>
                    <Check className="w-6 h-6 text-green-500" />
                    <p className="col-span-9 text-left">{o.title}</p>
                  </>
                ) : (
                  <>
                    <div></div>
                    <p className="col-span-9 text-left text-slate-300">
                      {o.title}
                    </p>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default PricingCard;
