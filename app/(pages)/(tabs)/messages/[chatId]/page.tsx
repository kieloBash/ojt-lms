import { PageProps } from "@/lib/interfaces/page.props";
import React from "react";

const SingleMessagePage = ({ params }: PageProps) => {
  console.log(params);
  return <div>SingleMessagePage</div>;
};

export default SingleMessagePage;
