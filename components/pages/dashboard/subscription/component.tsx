"use client";
import React, { useState } from "react";

// UI
import { PACKAGES } from "@/utils/constants/plans";
import AdditionalInfo from "./cards/additional-info";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

import useGetLinks from "./hook/useGetLinks";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import PricingCard from "./cards/pricing";

const SubscriptionMain = () => {
  const { selectedChild } = useSelectedChild();
  const [duration, setDuration] = useState<"month" | "year">("month");

  const { data: links, isLoading } = useGetLinks({
    customerId: selectedChild?.stripe_customer_id || "",
    childId: selectedChild?._id || "",
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-17.5rem)]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <section className="relative flex flex-col w-full h-full px-20 pb-8 -mt-8">
      <div className="absolute grid grid-cols-5 gap-4 font-bold text-white translate-x-1/2 -top-16 right-1/2">
        <div className="flex items-center justify-end col-span-2">
          <span className={`${duration !== "month" && "text-slate-400"}`}>
            Monthly
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Switch
            onCheckedChange={(e) => {
              if (e) setDuration("year");
              else setDuration("month");
            }}
          />
        </div>
        <div
          className={`flex flex-col items-center justify-center col-span-2 ${
            duration !== "year" && "text-slate-400"
          }`}
        >
          <span className={``}>Annually</span>
          <span className="text-xs font-normal">Enjoy a 20% Discount</span>
        </div>
      </div>
      <div className="grid w-full min-h-screen grid-cols-3 gap-4 overflow-hidden bg-white border divide-x shadow-md rounded-2xl">
        {PACKAGES.map((p, index) => {
          let link;
          if (p.label === "Discovery") {
            link =
              duration === "month"
                ? links?.discover.month
                : links?.discover.year;
          } else if (p.label === "Advancement") {
            link =
              duration === "month" ? links?.advance.month : links?.advance.year;
          } else {
            link =
              duration === "month"
                ? links?.ultimate.month
                : links?.ultimate.year;
          }

          return (
            <PricingCard
              key={index}
              title={p.label}
              price={duration === "month" ? p.priceMo : p.priceYr}
              description={p.description}
              offers={p.offers}
              duration={duration}
              link={link as string}
              discounted={p.discounted}
              discountedPrice={
                p.discounted
                  ? duration === "month"
                    ? p.discountedPriceMo
                    : p.discountedPriceYr
                  : duration === "month"
                  ? p.discountedPriceMo
                  : p.discountedPriceYr
              }
            />
          );
        })}
      </div>
      <AdditionalInfo />
    </section>
  );
};

export default SubscriptionMain;
