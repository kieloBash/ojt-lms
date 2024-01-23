import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

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
  return (
    <div className="relative flex flex-col px-10 pt-20 pb-16 text-center">
      {title === "Ultimate" && (
        <Badge className="absolute text-base translate-x-1/2 top-8 right-1/2">
          Recommended
        </Badge>
      )}
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="w-full mt-12 mb-8 text-6xl font-medium">
        {discounted || duration === "year" ? (
          <>
            <span className="mr-4 line-through text-slate-300">${price}</span>$
            {discountedPrice}
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
      <h4 className="h-20 mt-8 text-lg text-muted-foreground">{description}</h4>
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
  );
};

export default PricingCard;
