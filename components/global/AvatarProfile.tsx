import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarProfile = ({
  name,
  profileURL,
  size = "md",
}: {
  name: string;
  profileURL: string;
  size?: "md" | "lg";
}) => {
  const SIZES = {
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };
  const className = SIZES[size];

  return (
    <Avatar className={className}>
      <AvatarImage src={profileURL || ""} alt="profile" />
      <AvatarFallback className="uppercase">{name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;
