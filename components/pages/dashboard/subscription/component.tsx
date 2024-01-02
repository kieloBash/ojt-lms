"use client";
import React, { useState } from "react";

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
import { Book, CrownIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
  NewTransactionPackageType,
  TransactionsType,
} from "@/lib/interfaces/transaction.interface";
import { useSelected } from "../parent/non-accepted/context/useSelected";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import useUserInfo from "@/components/hooks/useUserInfo";
import { createNewTransactionSubscription } from "@/lib/actions/transaction.action";
import AdditionalInfo from "./cards/additional-info";

const SubscriptionMain = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selected } = useSelected();
  const { selectedChild } = useSelectedChild();
  const userInfo = useUserInfo();

  async function OpenDiscoverySubscription(plan: "mo" | "yr") {
    window.open(
      "https://checkout.umonicsplus.com/b/8wMdUgbGL6TB4XS003?locale=en&__embed_source=buy_btn_1OFCYgJdrjeVG3h12HCb9Z3C",
      "_blank"
    );
  }
  async function OpenAdvanceSubscription(plan: "mo" | "yr") {
    window.open(
      "https://checkout.umonicsplus.com/b/aEUdUg1275PxfCw9AC?locale=en&__embed_source=buy_btn_1OFCUVJdrjeVG3h14v8ccxp1",
      "_blank"
    );
  }
  async function OpenUltimateSubscription(plan: "mo" | "yr") {
    window.open(
      "https://checkout.umonicsplus.com/b/aEUdUg1275PxfCw9AC?locale=en&__embed_source=buy_btn_1OFCUVJdrjeVG3h14v8ccxp1",
      "_blank"
    );
  }

  async function newTransaction({
    price,
    package: packageType,
  }: {
    price: number;
    package: string;
  }) {
    const NewTransaction = {
      student: selectedChild?._id as string,
      parent: userInfo?._id as string,
      price,
      status: "Paid",
      package: packageType,
      classSchedule: [],
    };
    // const { success } = await createNewTransactionSubscription({
    //   NewTransaction,
    // });
    // return success;
    return true;
  }

  return (
    <section className="relative flex flex-col w-full h-full pb-8">
      <header className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-800 to-indigo-900 h-[16rem]">
        <h1 className="text-3xl font-bold text-white">
          🚀 Exclusive Learning Packages: An Unveiling of Value 🚀
        </h1>
        <p className="w-full max-w-[56rem] text-sm text-center text-white mt-6">
          We hope this newsletter finds you well. At The Umonics Method, we're
          delighted to share some exciting news that will shape your child's
          educational journey like never before!
        </p>
      </header>
      <div className="flex items-start justify-center w-full gap-4 -mt-10">
        {PACKAGES.map((p, index) => {
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
                      Enjoy a 20% Discount in Yearly Packages
                    </p>
                    <div className="flex-1">
                      <Separator />
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full gap-4 text-white">
                    <button
                      onClick={async () => {
                        setIsLoading(true);
                        const PACKAGE_TYPE = [
                          "Discover",
                          "Advance",
                          "Ultimate",
                        ];

                        const res = await newTransaction({
                          price:
                            (p.discounted ? p.discountedPriceMo : p.priceMo) ||
                            0,
                          package: PACKAGE_TYPE[index],
                        });

                        if (res)
                          switch (index) {
                            case 0:
                              OpenDiscoverySubscription("mo");
                              break;
                            case 1:
                              OpenAdvanceSubscription("mo");
                              break;
                            case 2:
                              OpenUltimateSubscription("mo");
                              break;
                            default:
                              break;
                          }
                        setIsLoading(false);
                        router.refresh();
                      }}
                      type="button"
                      className="h-[11rem] relative flex flex-col gap-2 items-center justify-between w-full p-4 py-8 text-xl shadow-lg hover: bg-gradient-to-r from-blue-800 to-indigo-900 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-800 rounded-2xl"
                    >
                      {p.discounted ? (
                        <>
                          <div className="-mt-4">
                            <Book className="w-10 h-10" />
                          </div>
                          <div className="absolute text-sm line-through top-[4rem] left-10">
                            ${p.discountedPriceMo}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center mt-4">
                              <span className="">$</span>
                              <div className="text-4xl font-extrabold">
                                {p.priceMo}
                              </div>{" "}
                              <span className="">/yr</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                              Enroll
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="-mt-4">
                            <Book className="w-10 h-10" />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center mt-4">
                              <span className="">$</span>
                              <div className="text-4xl font-extrabold">
                                {p.priceMo}
                              </div>{" "}
                              <span className="">/yr</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                              Enroll
                            </div>
                          </div>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="h-[11rem] relative flex flex-col gap-2 items-center justify-between w-full p-4 py-8 text-xl transition-colors shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-violet-500 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl"
                    >
                      <div className="-mt-4">
                        <CrownIcon className="w-10 h-10" />
                      </div>
                      <div className="absolute text-sm line-through top-[4rem] left-10">
                        ${p.discountedPriceYr}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center mt-4">
                          <span className="">$</span>
                          <div className="text-4xl font-extrabold">
                            {p.priceYr}
                          </div>{" "}
                          <span className="">/yr</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                          Enroll
                        </div>
                      </div>
                    </button>
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
