"use client";
import React, { useEffect, useState } from "react";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { isParent } from "@/utils/helpers/isParent";
import { createCheckoutLink } from "@/utils/helpers/stripe/billing";
import { AdvanceYR } from "@/utils/helpers/stripe/prices";
import { CrownIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";

const AdvanceYRButton = ({
  p,
  userInfo,
}: {
  userInfo: any;
  p: {
    label: string;
    priceMo: number;
    priceYr: number;
    discounted: boolean;
    discountedPriceYr: number;
    description: string;
    offers: {
      title: string;
      details: string;
    }[];
    discountedPriceMo?: undefined;
  };
}) => {
  const { selectedChild } = useSelectedChild();
  const [isLoading, setisLoading] = useState(false);
  const [link, setLink] = useState("");

  useEffect(() => {
    async function OpenSubscription() {
      const checkout_link = await createCheckoutLink(
        isParent(userInfo) ? userInfo?.stripe_customer_id || "" : "",
        AdvanceYR,
        selectedChild?._id as string
      );

      setLink(checkout_link + "");
      setisLoading(false);
    }

    setisLoading(true);
    if (userInfo) {
      OpenSubscription();
    }
  }, [userInfo]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-20">
          <Loader2Icon className="w-5 h-5 text-black animate-spin" />
        </div>
      ) : (
        <>
          <Link href={link}>
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
          </Link>
        </>
      )}
    </>
  );
};

export default AdvanceYRButton;
