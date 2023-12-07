import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <section className="fixed inset-0 flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin" />
    </section>
  );
};

export default LoadingPage;
