// @ts-nocheck
"use client";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { UserType } from "@/lib/interfaces/user.interface";
import { useSelected } from "../../parent/non-accepted/context/useSelected";
import { TransactionsType } from "@/lib/interfaces/transaction.interface";
import { createNewTransactionSubscription } from "@/lib/actions/transaction.action";
import { useRouter } from "next/navigation";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";

const AllInclusiveBtn = ({ close }: { close: (e: string) => void }) => {
  const { data: session } = useSession();
  const userInfo = session?.user as UserType;
  const router = useRouter();

  const { selected } = useSelected();
  const { selectedChild } = useSelectedChild();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const NewTransaction: TransactionsType = {
    student: selectedChild?._id as string,
    parent: userInfo?._id as string,
    price: 55,
    status: "Not Paid",
    package: "AllInclusive",
    classSchedule: selected.map((d) => d._id),
  };

  console.log(NewTransaction);

  async function handleClick() {
    setIsLoading(true);

    const res = await createNewTransactionSubscription({ NewTransaction });
    if (res.success) {
      setIsLoading(false);
      close("payment");
      router.replace("/dashboard");
      window.open(
        "https://checkout.umonicsplus.com/b/aEUdUg1275PxfCw9AC?locale=en&__embed_source=buy_btn_1OFCUVJdrjeVG3h14v8ccxp1",
        "_blank"
      );
    }
  }

  return (
    <>
      <div className="hidden">
        <stripe-buy-button
          buy-button-id="buy_btn_1OFCUVJdrjeVG3h14v8ccxp1"
          publishable-key="pk_live_51JtS02JdrjeVG3h1ComVNr82vGBAXYpUPscimAooqw4YYpXI3UzHKmAYDRgbf37YIZ4GDHsjo0Rw1GZev6htsfG700SGmWjXGT"
        ></stripe-buy-button>
      </div>
      <Button
        disabled={isLoading}
        type="button"
        className="w-full py-6 text-base font-bold"
        onClick={handleClick}
      >
        Enroll Now
        {isLoading && <Loader2 className="w-6 h-6 ml-2 animate-spin" />}
      </Button>
    </>
  );
};

export default AllInclusiveBtn;
