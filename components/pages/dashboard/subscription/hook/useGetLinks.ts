"use client";

import { createCheckoutLink } from "@/utils/helpers/stripe/billing";
import {
  AdvanceMO,
  AdvanceYR,
  DiscoverMO,
  DiscoverYR,
  UltimateMO,
  UltimateYR,
} from "@/utils/helpers/stripe/prices";
import { useQuery } from "@tanstack/react-query";

const useGetLinks = ({
  customerId,
  childId,
}: {
  customerId: string;
  childId: string;
}) => {
  const { data, isLoading } = useQuery({
    enabled: customerId !== "",
    queryKey: [`checkout-link`,childId],
    queryFn: async () => {
      console.log("load");
      const discoverMO = await createCheckoutLink(
        customerId,
        DiscoverMO,
        childId
      );
      const discoverYR = await createCheckoutLink(
        customerId,
        DiscoverYR,
        childId
      );
      const advanceMO = await createCheckoutLink(
        customerId,
        AdvanceMO,
        childId
      );
      const advanceYR = await createCheckoutLink(
        customerId,
        AdvanceYR,
        childId
      );
      const ultimateMO = await createCheckoutLink(
        customerId,
        UltimateMO,
        childId
      );
      const ultimateYR = await createCheckoutLink(
        customerId,
        UltimateYR,
        childId
      );

      return {
        discover: { month: discoverMO, year: discoverYR },
        advance: { month: advanceMO, year: advanceYR },
        ultimate: { month: ultimateMO, year: ultimateYR },
      };
    },
  });
  return { data, isLoading };
};

export default useGetLinks;
