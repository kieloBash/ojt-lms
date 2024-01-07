"use client";
import useUserInfo from "@/components/hooks/useUserInfo";
import { fetchSingleChildId } from "@/lib/actions/parent.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import {
  generateStudentCustomerPortalLink,
  generateStudentCustomerUpdatePortalLink,
} from "@/utils/helpers/stripe/billing";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useContext } from "react";

const SelectedChildContext = createContext<{
  billingLink: string;
  updateBillLink: string;
  selectedChild: StudentType | undefined;
  setSelectedChild: (sel: StudentType) => void;
}>({
  billingLink: "",
  updateBillLink: "",
  selectedChild: undefined,
  setSelectedChild: (sel: StudentType) => {},
});

export const SelectedChildProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedChild, setSelectedChild] = useState<StudentType | undefined>();

  const userInfo: ParentType = useUserInfo() as ParentType;

  async function fetchStudent(_id: string) {
    const student = await fetchSingleChildId({ _id });
    setSelectedChild(student);
  }
  const [billingLink, setBillingLink] = useState("");
  const [updateBillLink, setUpdateBillLink] = useState("");

  async function customerPortalLink() {
    if (selectedChild) {
      const manage_link = await generateStudentCustomerPortalLink(
        selectedChild?.stripe_customer_id as string
      );
      return manage_link;
    }
  }
  async function customerUpdatePortalLink() {
    if (selectedChild) {
      const manage_link = await generateStudentCustomerUpdatePortalLink(
        selectedChild?.stripe_customer_id as string
      );
      return manage_link;
    }
  }

  React.useEffect(() => {
    if (userInfo && userInfo?.children && !selectedChild) {
      fetchStudent(userInfo?.children[0]._id as string);
    }
  }, [userInfo, selectedChild]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (selectedChild) {
        const manageLink = await customerPortalLink();
        const updateLink = await customerUpdatePortalLink();
        setBillingLink(manageLink || "");
        setUpdateBillLink(updateLink || "");
      }
    };
    fetchData();
  }, [selectedChild]);

  return (
    <SelectedChildContext.Provider
      value={{
        billingLink,
        updateBillLink,
        selectedChild,
        setSelectedChild,
      }}
    >
      {children}
    </SelectedChildContext.Provider>
  );
};

export const useSelectedChild = () => useContext(SelectedChildContext);
