import { Metadata } from "next";
import TransactionsComponent from "./component";

export const metadata: Metadata = {
  title: "Umonics LMS | Transactions",
  description: "Created by interns",
};

export default async function TransactionsPage() {
  return (
    <>
      <div className="flex flex-col flex-1 h-full p-8 space-y-8 bg-white">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-main-500">
              Transactions
            </h2>
            <p className="text-muted-foreground">
              {`Here's a list of transaction you've made.`}
            </p>
          </div>
        </div>
        <TransactionsComponent />
      </div>
    </>
  );
}
