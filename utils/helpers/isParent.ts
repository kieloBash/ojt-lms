import { ParentType } from "@/lib/interfaces/parent.interface";

export function isParent(recipient: any): recipient is ParentType {
  
  return (recipient as ParentType).children !== undefined;
}
