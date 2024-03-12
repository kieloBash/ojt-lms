"use client";
import React, { useEffect } from "react";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { useSelected } from "./non-accepted/context/useSelected";

// UI
import ChildSwitcher from "./child-switcher";
import NotAcceptedComponent from "./non-accepted/component";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import StudentAcceptedScetion from "./accepted/main";
import SubscriptionMain from "../subscription/component";

import {
  createChildStripeAccount,
  getCheckoutInfo,
} from "@/utils/helpers/stripe/billing";
import { createNewTransactionSubscription } from "@/lib/actions/transaction.action";
import { useRouter } from "next/navigation";

const ParentMain = ({
  parent,
  manage_link,
  sessionId,
  studentId,
  status,
}: {
  parent: ParentType;
  manage_link: string;
  sessionId: string;
  studentId: string;
  status: boolean;
}) => {
  const { clear } = useSelected();
  const { setSelectedChild, selectedChild, updateBillLink } =
    useSelectedChild();
  const router = useRouter();

  function handleSelectChild(sel: StudentType) {
    // console.log(sel);
    setSelectedChild(sel);
    clear();
  }

  async function checkOutInfo() {
    if (sessionId !== "" && status) {
      // User has successfully completed the payment process
      console.log("succcess");
      const checkOut = await getCheckoutInfo(sessionId);

      const NewTransaction = {
        student: studentId,
        parent: parent?._id as string,
        price: checkOut.data[0].amount_total / 100,
        status: "Paid",
        package: checkOut.data[0].description,
        classSchedule: [],
      };
      console.log(NewTransaction);
      const { success } = await createNewTransactionSubscription({
        NewTransaction,
      });
      if (success) window.location.replace(`/dashboard?new=${true}`);
    } else if (sessionId !== "" && !status) {
      // User has cancelled the payment process
      console.log("cancelled");

      const checkOut = await getCheckoutInfo(sessionId);
      const NewTransaction = {
        student: studentId,
        parent: parent?._id as string,
        price: checkOut.data[0].amount_total / 100,
        status: "Paid",
        package: checkOut.data[0].description,
        classSchedule: [],
      };
      console.log(NewTransaction);
    }
  }

  async function createStripeAcc() {
    const res = await createChildStripeAccount({
      parentEmail: parent.email,
      childId: selectedChild?._id as string,
    });
  }

  useEffect(() => {
    if (parent && selectedChild) {
      // customerPortalLink();
      if (sessionId && studentId) checkOutInfo();

      createStripeAcc();
    }
  }, [sessionId, studentId, status, parent, selectedChild]);

  if (!selectedChild) return null;
  if (parent?.children?.length === 0 && parent?.children) return null;

  if (selectedChild.status === "Enrolling")
    return (
      <>
        {/* MOBILE */}
        <section className="flex flex-col items-center w-full h-full overflow-y-auto bg-white justify-normal md:hidden xl:hidden lg:hidden">
          <header className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-800 to-indigo-900 h-[18rem] pb-16 gap-4">
            <div className="flex items-center justify-between w-full px-10">
              <div className="flex items-center justify-center w-full gap-2">
                <h2 className="text-4xl font-bold tracking-tight text-center text-white">
                  Subscriptions
                </h2>
              </div>
              {/* <ChildSwitcher
                parent={parent}
                students={parent?.children as StudentType[]}
                selectedChild={selectedChild}
                handleSelectChild={handleSelectChild}
              /> */}
            </div>
            <h1 className="px-2 text-sm font-medium text-center text-white">
              {`🚀 Exclusive Learning Packages: An Unveiling of Value 🚀`}
            </h1>
          </header>
          <SubscriptionMain />
        </section>

        {/* DESKTOP */}
        <section className="flex-col hidden w-full overflow-y-auto bg-white md:flex xl:flex lg:flex">
          <header className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-800 to-indigo-900 h-[16rem]">
            <div className="flex items-center justify-between w-full px-10 pb-8 -mt-10">
              <div className="flex gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Subscriptions
                </h2>
              </div>
              <ChildSwitcher
                parent={parent}
                students={parent?.children as StudentType[]}
                selectedChild={selectedChild}
                handleSelectChild={handleSelectChild}
              />
            </div>
            <h1 className="text-3xl font-bold text-white">
              {`🚀 Exclusive Learning Packages: An Unveiling of Value 🚀`}
            </h1>
            <p className="w-full max-w-[56rem] text-sm text-center text-white mt-6 h-12">
              {/* {`We hope this newsletter finds you well. At The Umonics Method, we're
          delighted to share some exciting news that will shape your child's
          educational journey like never before!`} */}
            </p>
          </header>
          <SubscriptionMain />
        </section>
      </>
    );

  return (
    <section className="flex flex-col w-full h-screen overflow-y-auto bg-white">
      <header className="flex items-center justify-between w-full h-24 p-10 py-5">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight text-main-500">
            Dashboard
          </h2>
          {selectedChild.package !== "Discover" && (
            <p className="text-sm text-muted-foreground">
              Welcome to your dashboard! Here you can quickly view everything
              within your package!
            </p>
          )}
        </div>
        <ChildSwitcher
          parent={parent}
          students={parent?.children as StudentType[]}
          selectedChild={selectedChild}
          handleSelectChild={handleSelectChild}
        />
      </header>
      <StudentAcceptedScetion
        selectedChild={selectedChild}
        billingLink={updateBillLink}
      />
    </section>
  );
};

export default ParentMain;
