import { AgeGroupType } from "@/lib/interfaces/class.interface";
import React from "react";
import RelatedClasses from "./related-classes";
import SmallCalendar from "./small-calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { stripe } from "@/lib/stripe";
import StripeButton from "./btn";

async function getProductsAndPrices() {
  const products = await stripe.products.list();
  let out = [];
  for (let product of products.data) {
    const prices = await stripe.prices.list({ product: product.id });
    out.push({ product, prices });
  }
  return out;
}

const NewEnrollmentSidebar = async ({
  ageGroup,
  classId,
  repeatedDays,
}: {
  ageGroup: AgeGroupType;
  classId: string;
  repeatedDays: string[];
}) => {
  const products = await getProductsAndPrices();
  console.log(products);
  return (
    <ScrollArea className="w-full h-screen col-span-3">
      <div className="flex flex-col w-full gap-6 px-8 py-8">
        <StripeButton classId={classId} />
        <SmallCalendar repeatedDays={repeatedDays} />
        <RelatedClasses ageGroup={ageGroup} classId={classId} />
      </div>
    </ScrollArea>
  );
};

export default NewEnrollmentSidebar;
