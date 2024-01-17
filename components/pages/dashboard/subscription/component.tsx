"use client";
import React from "react";

// UI
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PACKAGES } from "@/utils/constants/plans";
import { Separator } from "@/components/ui/separator";
import useUserInfo from "@/components/hooks/useUserInfo";
import AdditionalInfo from "./cards/additional-info";
import DiscoverMOButton from "./buttons/discover-mo";
import DiscoverYRButton from "./buttons/discover-yr";
import AdvanceMOButton from "./buttons/advance-mo";
import AdvanceYRButton from "./buttons/advance-yr";
import UltimateMOButton from "./buttons/ultimate-mo";
import UltimateYRButton from "./buttons/ultimate-yr";

const SubscriptionMain = () => {
  const userInfo = useUserInfo();
  return (
    <section className="relative flex flex-col w-full h-full pb-8">
      <div className="flex items-start justify-center w-full gap-4 -mt-10">
        {PACKAGES.map((p, index) => {
          const PACKAGE_TYPE = ["Discover", "Advance", "Ultimate"];
          return (
            <Card
              key={index}
              className="w-full max-w-[25rem] h-full flex flex-col justify-between p-4 relative"
            >
              {p.discounted && (
                <div className="absolute flex items-center justify-center p-4 text-center rounded-full aspect-square -top-6 -right-6 bg-main-500">
                  <span className="font-bold text-white">
                    Limited <br /> Time
                  </span>
                </div>
              )}
              <div className="">
                <CardHeader className="h-[13rem]">
                  <CardTitle>{p.label}</CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col w-full">
                  <div className="flex items-center justify-center w-full gap-2 my-4 text-xs text-black">
                    <div className="flex-1">
                      <Separator />
                    </div>
                    <p className="text-muted-foreground">
                      {`Enjoy a 20% Discount in Yearly Packages`}
                    </p>
                    <div className="flex-1">
                      <Separator />
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full gap-4 text-white">
                    {PACKAGE_TYPE[index] === "Discover" && (
                      <>
                        <DiscoverMOButton p={p as any} userInfo={userInfo} />
                        <DiscoverYRButton p={p as any} userInfo={userInfo} />
                      </>
                    )}
                    {PACKAGE_TYPE[index] === "Advance" && (
                      <>
                        <AdvanceMOButton p={p as any} userInfo={userInfo} />
                        <AdvanceYRButton p={p as any} userInfo={userInfo} />
                      </>
                    )}
                    {PACKAGE_TYPE[index] === "Ultimate" && (
                      <>
                        <UltimateMOButton p={p as any} userInfo={userInfo} />
                        <UltimateYRButton p={p as any} userInfo={userInfo} />
                      </>
                    )}
                  </div>
                  <div className="mt-10 font-bold">Benefits</div>
                  <ul className="pl-2 text-xs">
                    {p.offers.map((offer, index) => {
                      return (
                        <li className="pb-4 list-decimal" key={index}>
                          <div className="font-bold">{offer.title}</div>
                          <div className="">{offer.details}</div>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </div>
              <CardFooter className="flex flex-col w-full">
                <div className="flex items-center justify-center w-full gap-2 my-4 text-sm text-black">
                  <div className="flex-1">
                    <Separator />
                  </div>
                  <p className="text-muted-foreground">
                    Prices are in US Dollars
                  </p>
                  <div className="flex-1">
                    <Separator />
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <AdditionalInfo />
    </section>
  );
};

export default SubscriptionMain;
