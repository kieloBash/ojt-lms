import {
  DashboardIcon,
  LeadsIcon,
  CalendarIcon,
  ClientChatsIcon,
  TransactionsIcon,
  UsersIcon,
  CustomersIcon,
  ClassesIcon,
} from "@/components/icons";

export interface LinkType {
  href: string;
  label: string;
  icon:
    | React.ReactNode
    | typeof DashboardIcon
    | typeof CalendarIcon
    | typeof ClientChatsIcon
    | typeof TransactionsIcon
    | typeof UsersIcon
    | typeof CustomersIcon
    | typeof ClassesIcon
    | typeof LeadsIcon;
}
