"use client";
import React, { useState } from "react";

// UI
import { PACKAGES, PACKAGES_MOBILE } from "@/utils/constants/plans";
import AdditionalInfo from "./cards/additional-info";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

import useGetLinks from "./hook/useGetLinks";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import PricingCard from "./cards/pricing";
import { Separator } from "@/components/ui/separator";

const SubscriptionMain = () => {
  const { selectedChild } = useSelectedChild();
  const [duration, setDuration] = useState<"month" | "year">("month");

  const { data: links, isLoading } = useGetLinks({
    customerId: selectedChild?.stripe_customer_id || "",
    childId: selectedChild?._id || "",
  });

  // console.log(links);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-17.5rem)]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <>
      {/* MOBILE */}
      <section className="relative flex flex-col w-full h-full px-6 pb-8 -mt-8 lg:hidden xl:hidden md:hidden">
        <div className="absolute grid w-full grid-cols-5 gap-4 font-bold text-white translate-x-1/2 -top-10 right-1/2">
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
            className={`flex flex-col text-left items-start justify-center col-span-2 ${
              duration !== "year" && "text-slate-400"
            }`}
          >
            <span className={``}>Yearly</span>
            <span className="text-xs font-normal text-left">
              Enjoy a <br /> 20% Discount
            </span>
          </div>
        </div>
        <article className="flex flex-col w-full min-h-screen mt-12 overflow-hidden bg-white border shadow-md rounded-2xl">
          {PACKAGES_MOBILE.map((p, index) => {
            let link;
            if (p.label === "Discovery") {
              link =
                duration === "month"
                  ? links?.discover.month
                  : links?.discover.year;
            } else if (p.label === "Advancement") {
              link =
                duration === "month"
                  ? links?.advance.month
                  : links?.advance.year;
            } else {
              link =
                duration === "month"
                  ? links?.ultimate.month
                  : links?.ultimate.year;
            }

            // console.log(link);

            return (
              <React.Fragment key={index}>
                <PricingCard
                  title={p.label}
                  price={duration === "month" ? p.priceMo : p.priceYr}
                  description={p.description}
                  offers={p.offers}
                  duration={duration}
                  link={(link as string) || ""}
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
                <Separator />
              </React.Fragment>
            );
          })}
        </article>
        <AdditionalInfo />
      </section>

      {/* DESKTOP */}
      <section className="relative flex-col hidden w-full h-full px-20 pb-8 -mt-8 lg:flex xl:flex md:flex">
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
            <span className={``}>Yearly</span>
            <span className="text-xs font-normal">Enjoy a 20% Discount</span>
          </div>
        </div>
        <article className="grid w-full min-h-screen grid-cols-3 gap-4 overflow-hidden bg-white border divide-x shadow-md rounded-2xl">
          {PACKAGES.map((p, index) => {
            let link;
            if (p.label === "Discovery") {
              link =
                duration === "month"
                  ? links?.discover.month
                  : links?.discover.year;
            } else if (p.label === "Advancement") {
              link =
                duration === "month"
                  ? links?.advance.month
                  : links?.advance.year;
            } else {
              link =
                duration === "month"
                  ? links?.ultimate.month
                  : links?.ultimate.year;
            }

            // console.log(link);

            return (
              <PricingCard
                key={index}
                title={p.label}
                price={duration === "month" ? p.priceMo : p.priceYr}
                description={p.description}
                offers={p.offers}
                duration={duration}
                link={(link as string) || ""}
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
        </article>
        <AdditionalInfo />
      </section>
    </>
  );
};

export default SubscriptionMain;
