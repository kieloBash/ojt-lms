import ParentComponent from "@/components/pages/dashboard/parent/component";
import TeacherSection from "@/components/pages/dashboard/teacher/main";
import { authUserClerk } from "@/lib/actions/parent.action";
import { createNewTransactionSubscription } from "@/lib/actions/transaction.action";
import { PageProps } from "@/lib/interfaces/page.props";
import { isParent } from "@/utils/helpers/isParent";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  getCheckoutInfo,
  hasSubscription,
} from "@/utils/helpers/stripe/billing";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Umonics LMS | Dashboard",
  description: "Created by interns",
};

const DashboardPage = async ({ searchParams }: PageProps) => {
  const user = await authUserClerk();
  

  // const manage_link = await generateCustomerPortalLink(
  //   isParent(user) ? session?.stripe_customer_id : "",
  //   isParent(user)
  // );
  // if (searchParams.session_id && searchParams.success) {
  //   // User has successfully completed the payment process
  //   console.log("succcess");
  //   const checkOut = await getCheckoutInfo(searchParams.session_id as string);
  //   // console.log(checkOut);
  //   // console.log(checkOut.data[0].description);
  //   // console.log(checkOut.data[0].price?.recurring?.interval);
  //   const NewTransaction = {
  //     student: searchParams.studentId as string,
  //     parent: user?._id as string,
  //     price: checkOut.data[0].amount_total / 100,
  //     status: "Paid",
  //     package: checkOut.data[0].description,
  //     classSchedule: [],
  //   };
  //   const { success } = await createNewTransactionSubscription({
  //     NewTransaction,
  //   });
  //   if (success) redirect("/dashboard");
  // } else if (searchParams.session_id && searchParams.fail) {
  //   // User has cancelled the payment process
  //   console.log("cancelled");

  //   const checkOut = await getCheckoutInfo(searchParams.session_id as string);
  //   // console.log(checkOut);
  //   // console.log(checkOut.data[0].description);
  //   // console.log(checkOut.data[0].price?.recurring?.interval);
  //   const NewTransaction = {
  //     student: searchParams.studentId as string,
  //     parent: user?._id as string,
  //     price: checkOut.data[0].amount_total / 100,
  //     status: "Paid",
  //     package: checkOut.data[0].description,
  //     classSchedule: [],
  //   };
  //   console.log(NewTransaction);
  // }

  if (!user) return redirect("/");

  return (
    <>
      {isParent(user) ? (
        <>
          <ParentComponent
            userInfo={user}
            manage_link={""}
            sessionId={(searchParams.session_id as string) || ""}
            status={
              searchParams.success ? true : searchParams.fail ? false : false
            }
            studentId={(searchParams.studentId as string) || ""}
          />
        </>
      ) : (
        <>
          <TeacherSection userInfo={user} />
        </>
      )}
    </>
  );
};
export default DashboardPage;
