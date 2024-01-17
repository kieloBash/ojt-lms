"use client";
import React, { useEffect, useState } from "react";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { isParent } from "@/utils/helpers/isParent";
import { createCheckoutLink } from "@/utils/helpers/stripe/billing";
import { DiscoverMO } from "@/utils/helpers/stripe/prices";
import { Book, Loader2Icon } from "lucide-react";
import Link from "next/link";

const DiscoverMOButton = ({
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
    async function OpenDiscoverySubscription() {
      const checkout_link = await createCheckoutLink(
        isParent(userInfo) ? userInfo?.stripe_customer_id || "" : "",
        DiscoverMO,
        selectedChild?._id as string
      );

      setLink(checkout_link + "");
      setisLoading(false);
    }

    setisLoading(true);
    if (userInfo) {
      OpenDiscoverySubscription();
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
              className="h-[11rem] relative flex flex-col gap-2 items-center justify-between w-full p-4 py-8 text-xl shadow-lg hover: bg-gradient-to-r from-blue-800 to-indigo-900 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-800 rounded-2xl"
            >
              <>
                {p.discounted ? (
                  <>
                    <div className="-mt-4">
                      <Book className="w-10 h-10" />
                    </div>
                    <div className="absolute text-sm line-through top-[4rem] left-10">
                      ${p.priceMo}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center mt-4">
                        <span className="">$</span>
                        <div className="text-4xl font-extrabold">
                          {p.discountedPriceMo}
                        </div>{" "}
                        <span className="">/mo</span>
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
                        <span className="">/mo</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                        Enroll
                      </div>
                    </div>
                  </>
                )}
              </>
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default DiscoverMOButton;
