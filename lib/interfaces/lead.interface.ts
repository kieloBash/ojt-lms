export interface LeadType {
  name: string;
  email: string;
  phone: string;
  child_name: string;
  child_age: number;
  form_name: string;
  status: LeadStatusType;
}
export interface MainLeadType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  child_name: string;
  child_age: number;
  form_name: string;
  status: LeadStatusType;
}

export type LeadStatusType = "Pending" | "Paid" | "Not Paid" | "Declined";
