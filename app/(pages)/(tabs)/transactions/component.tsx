"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useTransactions from "@/components/pages/transactions/hooks/useTransactions";
import LoadingPage from "@/components/loading";

const TransactionsComponent = () => {
  const transactions = useTransactions();

  if (transactions.isLoading) return <LoadingPage />;

  console.log(transactions);

  return (
    <>
      <DataTable columns={columns} data={transactions?.data || []} />
    </>
  );
};

export default TransactionsComponent;
